# Cloudflare Turnstile Setup Guide

This guide will help you set up Cloudflare Turnstile captcha for the contact form.

## Prerequisites

- A Cloudflare account (free)
- Access to your website's environment variables

## Step 1: Get Your Turnstile Keys

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** in the left sidebar
3. Click **Add Site** or **Create Widget**
4. Configure your widget:
   - **Site Name**: Goan Traders Contact Form
   - **Domain**: Add your website domain (e.g., `goantraders.com`)
   - **Widget Mode**: Choose **Managed** (recommended) or **Non-Interactive**
5. Click **Create**
6. Copy both keys:
   - **Site Key** (visible in browser, frontend)
   - **Secret Key** (keep secure, backend only)

## Step 2: Configure Environment Variables

1. Open the `.env` file in the root directory of your project
2. Replace the placeholder values with your actual keys:

```env
CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

3. Also update your Discord webhook URL if not already done:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

## Step 3: Deploy

If deploying to production, make sure to add these environment variables to your hosting platform.

### For Vercel (Recommended):
**See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete deployment guide**

Quick steps:
1. Go to Vercel project settings
2. Navigate to **Settings** > **Environment Variables**
3. Add each variable for **Production**, **Preview**, and **Development**:
   - `CLOUDFLARE_TURNSTILE_SITE_KEY`
   - `CLOUDFLARE_TURNSTILE_SECRET_KEY`
   - `DISCORD_WEBHOOK_URL`
4. **Important**: Redeploy after adding variables

### For Netlify:
1. Go to **Site settings** > **Environment variables**
2. Add the same variables as above

### For other platforms:
Consult your platform's documentation for adding environment variables.

## How It Works

1. **Frontend**: The Turnstile widget loads on the contact page
2. **User Interaction**: User fills out the form and completes the captcha challenge
3. **Form Submission**: The form includes the Turnstile token
4. **Backend Verification**: 
   - Server receives the token
   - Verifies with Cloudflare's API
   - Only processes the form if verification succeeds
5. **Success**: Form data is sent to Discord and user is redirected to WhatsApp

## Testing

### Test Keys (Development Only)

For testing purposes, Cloudflare provides test keys:

```env
# Always passes
CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Always fails
CLOUDFLARE_TURNSTILE_SITE_KEY=2x00000000000000000000AB
CLOUDFLARE_TURNSTILE_SECRET_KEY=2x0000000000000000000000000000000AA

# Forces interactive challenge
CLOUDFLARE_TURNSTILE_SITE_KEY=3x00000000000000000000FF
CLOUDFLARE_TURNSTILE_SECRET_KEY=3x0000000000000000000000000000000AA
```

**Important**: Never use test keys in production!

## Features Implemented

✅ Cloudflare Turnstile widget on contact form  
✅ Frontend validation (checks if captcha completed)  
✅ Backend verification with Cloudflare API  
✅ Automatic widget reset after submission  
✅ User-friendly error messages  
✅ Environment variable configuration  
✅ Rate limiting protection  
✅ Input sanitization  

## Troubleshooting

### Widget Not Appearing
- Check if `CLOUDFLARE_TURNSTILE_SITE_KEY` is set correctly
- Verify the Turnstile script is loading (check browser console)
- Make sure your domain is added in Cloudflare Turnstile settings

### Verification Failing
- Ensure `CLOUDFLARE_TURNSTILE_SECRET_KEY` is correct
- Check that the secret key matches the site key
- Verify your server can reach `challenges.cloudflare.com`

### "Captcha verification required" Error
- User didn't complete the captcha challenge
- Widget failed to load (check network tab)

## Security Notes

- ⚠️ Never commit `.env` file to version control
- ⚠️ Keep your Secret Key confidential
- ⚠️ The Site Key can be public (it's visible in frontend code)
- ✅ Captcha verification happens server-side for security
- ✅ Combined with rate limiting for extra protection

## Additional Resources

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
- [Migration Guide from reCAPTCHA](https://developers.cloudflare.com/turnstile/migration/)

## Support

For issues or questions:
- Check the [Cloudflare Turnstile FAQ](https://developers.cloudflare.com/turnstile/faq/)
- Contact Cloudflare Support
- Review the implementation in `src/pages/contact.astro` and `src/pages/api/submit-form.js`
