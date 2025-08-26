# Security Setup

## Discord Webhook Setup
1. Go to your Discord server
2. Server Settings > Integrations > Webhooks  
3. Create New Webhook
4. Copy the webhook URL
5. Add it to your `.env` file:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
   ```

## Production
Set `NODE_ENV=production` in your production environment.

That's it!
