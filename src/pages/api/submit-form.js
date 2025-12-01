// Path: src/pages/api/submit-form.js
export const prerender = false;

// Security configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 1000;
const RECAPTCHA_SECRET_KEY = import.meta.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// CORS headers for cross-origin requests
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// In-memory rate limiting (for production, use Redis or database)
const rateLimitStore = new Map();

// Input sanitization function
function sanitizeInput(input) {
  if (!input) return '';
  return input
    .toString()
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, MAX_FIELD_LENGTH); // Limit length
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (Indian format)
function isValidPhone(phone) {
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}

// Rate limiting check
function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }
  
  const requests = rateLimitStore.get(ip);
  
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  
  return true; // Request allowed
}

async function verifyRecaptcha(token, clientIP) {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error('reCAPTCHA secret key not configured');
    return { success: false, error: 'recaptcha_not_configured' };
  }

  const params = new URLSearchParams();
  params.append('secret', RECAPTCHA_SECRET_KEY);
  params.append('response', token);

  if (clientIP && clientIP !== 'unknown') {
    params.append('remoteip', clientIP);
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params,
    signal: AbortSignal.timeout(5000)
  });

  const result = await response.json();
  const validAction = result.action === 'contact_form';
  const meetsScore = typeof result.score === 'number' && result.score >= RECAPTCHA_SCORE_THRESHOLD;

  return {
    success: Boolean(result.success && validAction && meetsScore),
    score: result.score,
    action: result.action,
    errorCodes: result['error-codes']
  };
}

export async function POST({ request, clientAddress }) {
  try {
    // Rate limiting
    const clientIP = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), { 
        status: 429,
        headers: CORS_HEADERS
      });
    }

    // Content-Type validation
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), { 
        status: 400,
        headers: CORS_HEADERS
      });
    }

    const formData = await request.formData();
    const recaptchaToken = formData.get('recaptchaToken');

    if (!recaptchaToken || typeof recaptchaToken !== 'string') {
      return new Response(JSON.stringify({ error: 'Security verification failed' }), { 
        status: 400,
        headers: CORS_HEADERS
      });
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken, clientIP);

    if (recaptchaResult.error === 'recaptcha_not_configured') {
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), { 
        status: 503,
        headers: CORS_HEADERS
      });
    }

    if (!recaptchaResult.success) {
      console.warn('reCAPTCHA validation failed', {
        score: recaptchaResult.score,
        action: recaptchaResult.action,
        errors: recaptchaResult.errorCodes
      });
      return new Response(JSON.stringify({ error: 'Security verification failed. Please try again.' }), { 
        status: 400,
        headers: CORS_HEADERS
      });
    }
    
    // Extract and sanitize inputs
    const name = sanitizeInput(formData.get('name'));
    const phone = sanitizeInput(formData.get('phone'));
    const email = sanitizeInput(formData.get('email'));
    const location = sanitizeInput(formData.get('location'));
    const products = sanitizeInput(formData.get('products'));
    const quantity = sanitizeInput(formData.get('quantity'));
    const message = sanitizeInput(formData.get('message')).substring(0, MAX_MESSAGE_LENGTH);
    
    // Validation
    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: 'Valid name required' }), { 
        status: 400,
        headers: CORS_HEADERS
      });
    }
    
    if (!phone || !isValidPhone(phone)) {
      return new Response(JSON.stringify({ error: 'Valid phone number required' }), { 
        status: 400,
        headers: CORS_HEADERS
      });
    }
    
    if (email && !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { 
        status: 400,
        headers: CORS_HEADERS
      });
    }

    const DISCORD_WEBHOOK_URL = import.meta.env.DISCORD_WEBHOOK_URL;
    
    if (!DISCORD_WEBHOOK_URL) {
      console.error('Discord webhook URL not configured');
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), { 
        status: 503,
        headers: CORS_HEADERS
      });
    }

    // Prepare secure Discord message
    const discordMessage = {
      username: "Goan Traders Secure Log",
      avatar_url: "https://media.discordapp.net/attachments/1407307695886696448/1407320603764985937/wflogo.png?ex=68a5acf2&is=68a45b72&hm=5d92e08c065794c349dd921c57056837291469e4853f3070fb6d39db0a37fce1&=&format=webp&quality=lossless&width=625&height=625",
      embeds: [
        {
          title: "🔒 Secure Form Submission",
          color: 3066993, // Green color for security
          fields: [
            { name: "👤 Name", value: name, inline: true },
            { name: "📞 Phone", value: phone, inline: true },
            { name: "📧 Email", value: email || "_Not provided_", inline: false },
            { name: "📍 Location", value: location || "_Not specified_", inline: true },
            { name: "📦 Quantity", value: quantity || "_Not specified_", inline: true },
            { name: "🏭 Products", value: products || "_Not specified_", inline: false },
            { name: "💬 Message", value: "```" + (message || "_No additional details_") + "```" },
            { name: "🌐 Client IP", value: clientIP, inline: true },
            { name: "🔒 Security", value: "✅ Validated & Sanitized", inline: true }
          ],
          footer: {
            text: `🕐 IST: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    // Send to Discord with timeout
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Goan-Traders-Secure-API/1.0'
      },
      body: JSON.stringify(discordMessage),
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (!discordResponse.ok) {
      throw new Error(`Discord webhook failed: ${discordResponse.status}`);
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: "Form submitted successfully" 
    }), { 
      status: 200,
      headers: { 
        ...CORS_HEADERS,
        'X-Rate-Limit-Remaining': (MAX_REQUESTS_PER_WINDOW - rateLimitStore.get(clientIP).length).toString()
      }
    });

  } catch (error) {
    // Log error securely (don't expose details to client)
    console.error('Secure API Error:', {
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), { 
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS
  });
}

// Handle non-POST requests
export async function GET() {
  return new Response(JSON.stringify({ 
    error: 'Method not allowed' 
  }), { 
    status: 405,
    headers: { 
      ...CORS_HEADERS,
      'Allow': 'POST, OPTIONS'
    }
  });
}
