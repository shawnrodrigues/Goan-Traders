# Quick Vercel Deployment Checklist

## Before You Deploy

- [ ] Get Cloudflare Turnstile keys from https://dash.cloudflare.com/
- [ ] Get Discord Webhook URL
- [ ] Update `.env` file locally for testing
- [ ] Test the contact form locally (`npm run dev`)
- [ ] Verify captcha widget appears and works

## Deploy to Vercel

### 1. Connect Repository
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New Project"
- [ ] Import your GitHub repository
- [ ] Vercel auto-detects Astro framework

### 2. Add Environment Variables
Go to **Settings** > **Environment Variables** and add:

- [ ] `CLOUDFLARE_TURNSTILE_SITE_KEY` = [Your site key]
  - Select: Production ✓ Preview ✓ Development ✓
  
- [ ] `CLOUDFLARE_TURNSTILE_SECRET_KEY` = [Your secret key]
  - Select: Production ✓ Preview ✓ Development ✓
  
- [ ] `DISCORD_WEBHOOK_URL` = [Your webhook URL]
  - Select: Production ✓ Preview ✓ Development ✓

### 3. Configure Turnstile Domain
- [ ] Go to Cloudflare Turnstile Dashboard
- [ ] Add your Vercel domain:
  - `yourdomain.com` (if using custom domain)
  - `*.vercel.app` (for preview deployments)
  - Or use `*` for testing

### 4. Deploy
- [ ] Click "Deploy" in Vercel
- [ ] Wait for build to complete
- [ ] Check for errors in build logs

## After Deployment

### Test Everything
- [ ] Visit deployed site
- [ ] Check contact page loads
- [ ] Verify Turnstile widget appears
- [ ] Fill form and complete captcha
- [ ] Submit form
- [ ] Check Discord for notification
- [ ] Verify WhatsApp redirect works
- [ ] Check browser console for errors

### Common Issues

**Widget not appearing?**
- Check CLOUDFLARE_TURNSTILE_SITE_KEY is set
- Verify domain in Turnstile settings
- Check browser console for errors

**Verification failing?**
- Verify CLOUDFLARE_TURNSTILE_SECRET_KEY is correct
- Check Vercel Function logs
- Ensure keys match the same Turnstile widget

**No Discord notification?**
- Check DISCORD_WEBHOOK_URL is correct
- Test webhook manually
- Check Vercel Function logs

### Access Logs
- Go to **Deployments** > [Your Deployment]
- Click **Functions** tab for API errors
- Click **Build Logs** tab for build issues

## Environment Variables Format

Copy these with your actual values:

```env
CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
```

## Need Help?

📖 Full Guide: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
🔧 Turnstile Setup: See [TURNSTILE_SETUP.md](./TURNSTILE_SETUP.md)

## Success Criteria

✅ Site loads without errors
✅ Captcha widget visible and functional
✅ Form submission works
✅ Discord receives notification
✅ WhatsApp redirect successful
✅ No console errors

---

**Remember**: Always redeploy after changing environment variables!
