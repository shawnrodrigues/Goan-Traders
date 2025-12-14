# Vercel Deployment Guide for Goan Traders

This guide covers deploying your Goan Traders website with Cloudflare Turnstile captcha to Vercel.

## ✅ Pre-Deployment Checklist

- [x] Vercel adapter installed (`@astrojs/vercel`)
- [x] Cloudflare Turnstile keys obtained
- [x] Discord webhook URL ready
- [x] All environment variables documented

## 🚀 Deployment Steps

### Step 1: Connect Your Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository: `Goan-Traders`
4. Vercel will auto-detect Astro framework

### Step 2: Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Add Environment Variables

**CRITICAL**: Add these environment variables in Vercel:

1. In your project settings, go to **Settings** > **Environment Variables**
2. Add the following variables for **Production**, **Preview**, and **Development**:

#### Required Environment Variables:

```
CLOUDFLARE_TURNSTILE_SITE_KEY
Value: [Your Turnstile Site Key from Cloudflare Dashboard]
```

```
CLOUDFLARE_TURNSTILE_SECRET_KEY
Value: [Your Turnstile Secret Key from Cloudflare Dashboard]
```

```
DISCORD_WEBHOOK_URL
Value: [Your Discord Webhook URL]
```

#### How to Add Each Variable:

1. Click **"Add New"**
2. **Key**: Enter the variable name (e.g., `CLOUDFLARE_TURNSTILE_SITE_KEY`)
3. **Value**: Paste your actual key/URL
4. **Environment**: Select **Production**, **Preview**, and **Development** (all three)
5. Click **"Save"**
6. Repeat for all three variables

### Step 4: Configure Domain in Cloudflare Turnstile

**IMPORTANT**: Update your Turnstile widget settings:

1. Go to [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Select your widget
3. Add these domains:
   - Your production domain (e.g., `goantraders.com`)
   - Your Vercel preview domains (e.g., `*.vercel.app`)
   - Or use wildcard: `*` (for testing)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (usually 1-2 minutes)
3. Vercel will provide you with a deployment URL

### Step 6: Test the Deployment

After deployment, test the contact form:

1. Visit your deployed site
2. Go to the Contact page
3. Verify the Turnstile widget appears
4. Fill out the form and complete the captcha
5. Submit and verify:
   - ✅ Form submission succeeds
   - ✅ Discord notification received
   - ✅ WhatsApp redirect works

## 🔍 Troubleshooting

### Build Fails

**Error**: `Module not found: @astrojs/vercel`
- **Solution**: Ensure `@astrojs/vercel` is in `package.json` dependencies
- Run: `npm install @astrojs/vercel`

### Captcha Widget Not Appearing

**Error**: Widget doesn't load on deployed site
- **Solution**: Check browser console for errors
- Verify `CLOUDFLARE_TURNSTILE_SITE_KEY` is set in Vercel
- Ensure domain is whitelisted in Turnstile settings

### "Captcha verification failed"

**Error**: Form submits but verification fails
- **Solution**: 
  - Check `CLOUDFLARE_TURNSTILE_SECRET_KEY` is correct in Vercel
  - Verify the secret key matches the site key
  - Ensure both keys are from the same Turnstile widget

### Environment Variables Not Working

**Error**: `undefined` or `null` for environment variables
- **Solution**:
  - Verify variables are set for the correct environment (Production/Preview)
  - Redeploy after adding variables (variables require redeployment)
  - Check variable names match exactly (case-sensitive)

### API Route 503 Error

**Error**: "Service temporarily unavailable"
- **Solution**: One or more environment variables are missing
- Check Vercel logs: **Deployments** > **[Your Deployment]** > **Functions** tab
- Verify all three environment variables are set

## 🔧 Advanced Configuration

### Custom Domains

After initial deployment:

1. Go to **Settings** > **Domains**
2. Add your custom domain (e.g., `goantraders.com`)
3. Configure DNS as instructed by Vercel
4. Update Turnstile widget to include the custom domain

### Environment-Specific Settings

For different configurations per environment:

```javascript
// In your Astro files
const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;
```

### Monitoring

Enable Vercel Analytics (already configured in `astro.config.mjs`):
- **Web Analytics**: Traffic and visitor insights
- **Speed Insights**: Performance monitoring

Access from: **Analytics** tab in Vercel dashboard

## 📊 Deployment Checklist

After deployment, verify:

- [ ] Website loads correctly
- [ ] Contact form displays Turnstile widget
- [ ] Form submission with captcha works
- [ ] Discord notifications arrive
- [ ] WhatsApp redirect functions
- [ ] No console errors
- [ ] All pages load (Home, Products, Contact, etc.)
- [ ] Mobile responsiveness works
- [ ] SSL certificate is active (https://)

## 🔐 Security Best Practices

1. **Never commit** `.env` file (already in `.gitignore`)
2. **Rotate keys** if exposed
3. **Use Vercel's Environment Variables** (encrypted at rest)
4. **Monitor** Discord webhook for spam
5. **Review** Turnstile analytics for bot traffic

## 📝 Updating After Deployment

### To Update Environment Variables:

1. Go to **Settings** > **Environment Variables**
2. Find the variable to update
3. Click **Edit**
4. Update value
5. **Redeploy** for changes to take effect

### To Deploy New Code Changes:

1. Push to your GitHub repository
2. Vercel automatically deploys (if auto-deploy is enabled)
3. Or manually trigger: **Deployments** > **Redeploy**

## 🆘 Getting Help

### Check Logs

1. Go to **Deployments**
2. Click on your deployment
3. Check **Functions** tab for API errors
4. Check **Build Logs** for build issues

### Common Log Locations

- **Build Errors**: Build Logs tab
- **Runtime Errors**: Functions tab
- **Client Errors**: Browser console

### Vercel Support

- [Vercel Documentation](https://vercel.com/docs)
- [Astro on Vercel Guide](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel Community Discord](https://discord.gg/vercel)

## 🎉 Success!

Once everything is working:
- Your contact form is protected by Cloudflare Turnstile
- Form submissions are logged to Discord
- Users are redirected to WhatsApp
- All data is secure and validated

**Next Steps**: Monitor your Discord channel for incoming form submissions!
