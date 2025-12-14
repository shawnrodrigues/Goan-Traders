# 🚀 Quick Start Guide - Goan Traders

Get the Goan Traders website running locally in 5 minutes!

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- Git

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/your-username/Goan-Traders.git
cd Goan-Traders

# Install dependencies
npm install
```

## Step 2: Environment Setup (2 minutes)

### Option A: Automated Setup (Recommended)

**Windows (PowerShell):**
```powershell
.\setup-env.ps1
```

**Mac/Linux (Bash):**
```bash
chmod +x setup-env.sh
./setup-env.sh
```

### Option B: Manual Setup

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Discord Webhook (Get from Discord Server Settings > Integrations)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN

# Cloudflare Turnstile Keys (Get from https://dash.cloudflare.com/)
CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

### 🔑 Getting Your Keys:

**Discord Webhook:**
1. Go to your Discord server
2. Server Settings > Integrations > Webhooks
3. Create New Webhook
4. Copy the webhook URL

**Cloudflare Turnstile:**
1. Visit https://dash.cloudflare.com/
2. Navigate to Turnstile
3. Create a new site/widget
4. Use domain: `localhost` for testing
5. Copy Site Key and Secret Key

**Or use test keys for local development:**
```env
# These always pass (for testing only!)
CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

## Step 3: Run Development Server (1 minute)

```bash
npm run dev
```

Open http://localhost:4321 in your browser 🎉

## Verify Everything Works

1. **Homepage**: Should load with products carousel
2. **Contact Page**: Navigate to /contact
3. **Captcha Widget**: Should see Cloudflare Turnstile widget
4. **Form Test**: Fill form and submit
   - Should validate captcha
   - Should redirect to WhatsApp
   - Should send notification to Discord

## Common Issues

### Port Already in Use
```bash
# Kill process on port 4321
npx kill-port 4321

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Turnstile Widget Not Showing
- Check if `CLOUDFLARE_TURNSTILE_SITE_KEY` is set in `.env`
- Make sure you're using test keys or have added `localhost` to your Turnstile widget domains

### Form Submission Fails
- Verify Discord webhook URL is correct
- Check Turnstile secret key matches site key
- Look at terminal logs for error messages

## Project Structure

```
├── src/
│   ├── pages/           # Routes
│   │   ├── index.astro       # Homepage
│   │   ├── contact.astro     # Contact page (with Turnstile)
│   │   └── api/
│   │       └── submit-form.js  # API endpoint
│   ├── components/      # Reusable components
│   ├── layouts/        # Page layouts
│   └── data/          # Product data
├── public/            # Static assets
└── .env              # Environment variables (create this!)
```

## Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro:check  # TypeScript checking
```

## Next Steps

- **Customize Content**: Edit `src/pages/` files
- **Add Products**: Modify `src/data/products.js`
- **Deploy**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Turnstile Setup**: See [TURNSTILE_SETUP.md](./TURNSTILE_SETUP.md)

## Need Help?

- 📖 [Full README](./README.md)
- 🚀 [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)
- 🔐 [Turnstile Setup](./TURNSTILE_SETUP.md)
- ✅ [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)

## Quick Test Checklist

- [ ] Dev server runs without errors
- [ ] Homepage loads and displays correctly
- [ ] Contact page shows Turnstile widget
- [ ] Form validation works
- [ ] Form submission succeeds
- [ ] Discord receives notification
- [ ] WhatsApp redirect functions

---

**Happy Building! 🏗️**
