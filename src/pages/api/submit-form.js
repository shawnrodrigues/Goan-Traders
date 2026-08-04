// Path: src/pages/api/submit-form.js
export const prerender = false;

// Security configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per minute per IP
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 1000;
const MIN_SUBMIT_TIME_MS = 4000;
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_IDENTICAL_SUBMISSIONS = 2;

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'jmailservice.com',
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'yopmail.com'
]);

const SPAM_PATTERNS = [
  /\bseo\b/i,
  /\bbacklink(s)?\b/i,
  /\bgoogle\s+rank(ing)?\b/i,
  /\bwebsite\s+traffic\b/i,
  /\blaunch\s+it\s+within\s+a\s+day\b/i,
  /\bguest\s+post\b/i,
  /\bcasino\b/i,
  /\bviagra\b/i,
  /\bcrypto\b/i
];

const ALLOWED_QUANTITY_UNITS = new Set(['bags', 'tons', 'kg', 'liters', 'truckloads', 'custom']);

// CORS headers for cross-origin requests
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// In-memory rate limiting (for production, use Redis or database)
const rateLimitStore = new Map();
const duplicateSubmissionStore = new Map();

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

function isDisposableEmail(email) {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1].toLowerCase();
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

// Phone validation (Indian format)
function isValidPhone(phone) {
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}

function hasSpamContent(content) {
  return SPAM_PATTERNS.some((pattern) => pattern.test(content));
}

function getQuantityText(quantityValue, quantityUnit, quantityCustomUnit, legacyQuantity) {
  if (quantityValue) {
    const selectedUnit = quantityUnit === 'custom' ? quantityCustomUnit : quantityUnit;
    return `${quantityValue}${selectedUnit ? ` ${selectedUnit}` : ''}`.trim();
  }
  return legacyQuantity || '';
}

function getClientIP({ request, clientAddress }) {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const forwardedIP = xForwardedFor ? xForwardedFor.split(',')[0].trim() : null;
  return forwardedIP || clientAddress || 'unknown';
}

function hasSuspiciousOrigin(request) {
  try {
    const requestOrigin = new URL(request.url).origin;
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    if (origin && origin !== requestOrigin) {
      return true;
    }

    if (referer && !referer.startsWith(requestOrigin)) {
      return true;
    }

    return false;
  } catch {
    return true;
  }
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

function checkDuplicateSubmission(signature) {
  const now = Date.now();
  const windowStart = now - DUPLICATE_WINDOW_MS;

  if (!duplicateSubmissionStore.has(signature)) {
    duplicateSubmissionStore.set(signature, []);
  }

  const attempts = duplicateSubmissionStore.get(signature);
  const recentAttempts = attempts.filter((time) => time > windowStart);

  if (recentAttempts.length >= MAX_IDENTICAL_SUBMISSIONS) {
    return false;
  }

  recentAttempts.push(now);
  duplicateSubmissionStore.set(signature, recentAttempts);
  return true;
}

export async function POST({ request, clientAddress }) {
  try {
    if (hasSuspiciousOrigin(request)) {
      return new Response(JSON.stringify({ error: 'Forbidden origin' }), {
        status: 403,
        headers: CORS_HEADERS
      });
    }

    // Rate limiting
    const clientIP = getClientIP({ request, clientAddress });
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

    // Honeypot trap for basic bots
    const website = sanitizeInput(formData.get('website'));
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    // Bot timing trap: real users take a few seconds to fill the form
    const formStartTimeRaw = formData.get('form_start_time');
    const formStartTime = Number(formStartTimeRaw);
    if (!formStartTime || Number.isNaN(formStartTime)) {
      return new Response(JSON.stringify({ error: 'Invalid form session' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    if (Date.now() - formStartTime < MIN_SUBMIT_TIME_MS) {
      return new Response(JSON.stringify({ error: 'Submission blocked' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }
    
    // Extract and verify Turnstile token (required)
    const turnstileToken = formData.get('cf-turnstile-response');
    const TURNSTILE_SECRET = import.meta.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

    if (!TURNSTILE_SECRET) {
      console.error('Turnstile secret key is not configured');
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503,
        headers: CORS_HEADERS
      });
    }

    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: 'Captcha verification is required' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    try {
      const turnstileVerification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET,
          response: turnstileToken,
          remoteip: clientIP
        })
      });

      const turnstileResult = await turnstileVerification.json();

      if (!turnstileResult.success) {
        return new Response(JSON.stringify({ error: 'Captcha verification failed' }), {
          status: 400,
          headers: CORS_HEADERS
        });
      }
    } catch (turnstileError) {
      console.error('Turnstile verification error:', turnstileError);
      return new Response(JSON.stringify({ error: 'Captcha validation service unavailable' }), {
        status: 503,
        headers: CORS_HEADERS
      });
    }
    
    // Extract and sanitize inputs
    const name = sanitizeInput(formData.get('name'));
    const phone = sanitizeInput(formData.get('phone'));
    const email = sanitizeInput(formData.get('email'));
    const location = sanitizeInput(formData.get('location'));
    const products = sanitizeInput(formData.get('products'));
    const quantityValue = sanitizeInput(formData.get('quantity_value'));
    const quantityUnit = sanitizeInput(formData.get('quantity_unit')).toLowerCase();
    const quantityCustomUnit = sanitizeInput(formData.get('quantity_unit_custom'));
    const legacyQuantity = sanitizeInput(formData.get('quantity'));
    const quantity = getQuantityText(quantityValue, quantityUnit, quantityCustomUnit, legacyQuantity);
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

    if (quantityValue) {
      const quantityNumber = Number(quantityValue);
      if (Number.isNaN(quantityNumber) || quantityNumber <= 0) {
        return new Response(JSON.stringify({ error: 'Quantity must be greater than zero' }), {
          status: 400,
          headers: CORS_HEADERS
        });
      }

      if (quantityUnit && !ALLOWED_QUANTITY_UNITS.has(quantityUnit)) {
        return new Response(JSON.stringify({ error: 'Invalid quantity unit selected' }), {
          status: 400,
          headers: CORS_HEADERS
        });
      }

      if (quantityUnit === 'custom' && !quantityCustomUnit) {
        return new Response(JSON.stringify({ error: 'Please enter custom quantity unit' }), {
          status: 400,
          headers: CORS_HEADERS
        });
      }
    }

    if (email && isDisposableEmail(email)) {
      return new Response(JSON.stringify({ error: 'Disposable email addresses are not allowed' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    const spamCheckText = `${name} ${email} ${location} ${products} ${quantity} ${message}`.toLowerCase();
    if (hasSpamContent(spamCheckText)) {
      return new Response(JSON.stringify({ error: 'Submission blocked by spam filter' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    const submissionSignature = `${phone}|${email.toLowerCase()}|${message.toLowerCase().replace(/\s+/g, ' ').trim()}`;
    if (!checkDuplicateSubmission(submissionSignature)) {
      return new Response(JSON.stringify({ error: 'Duplicate submission detected' }), {
        status: 429,
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