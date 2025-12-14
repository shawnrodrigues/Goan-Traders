#!/bin/bash

# Environment Setup Script for Goan Traders
# This script helps you set up your environment variables

echo "🏗️  Goan Traders - Environment Setup"
echo "====================================="
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

# Copy from example
if [ ! -f .env.example ]; then
    echo "❌ Error: .env.example not found!"
    exit 1
fi

cp .env.example .env
echo "✅ Created .env file from .env.example"
echo ""

# Get Discord Webhook
echo "📬 Discord Webhook URL"
echo "Get this from: Discord Server Settings > Integrations > Webhooks"
read -p "Enter Discord Webhook URL: " discord_url

if [ ! -z "$discord_url" ]; then
    sed -i.bak "s|DISCORD_WEBHOOK_URL=.*|DISCORD_WEBHOOK_URL=$discord_url|" .env
    echo "✅ Discord webhook configured"
else
    echo "⚠️  Skipped Discord webhook"
fi

echo ""

# Get Turnstile keys
echo "🔐 Cloudflare Turnstile Keys"
echo "Get these from: https://dash.cloudflare.com/ > Turnstile"
echo ""
echo "For testing, you can use these test keys:"
echo "Site Key:   1x00000000000000000000AA (always passes)"
echo "Secret Key: 1x0000000000000000000000000000000AA"
echo ""

read -p "Use test keys? (Y/n): " -n 1 -r
echo

if [[ $REPLY =~ ^[Nn]$ ]]; then
    # Get real keys
    read -p "Enter Turnstile Site Key: " site_key
    read -p "Enter Turnstile Secret Key: " secret_key
    
    if [ ! -z "$site_key" ]; then
        sed -i.bak "s|CLOUDFLARE_TURNSTILE_SITE_KEY=.*|CLOUDFLARE_TURNSTILE_SITE_KEY=$site_key|" .env
    fi
    
    if [ ! -z "$secret_key" ]; then
        sed -i.bak "s|CLOUDFLARE_TURNSTILE_SECRET_KEY=.*|CLOUDFLARE_TURNSTILE_SECRET_KEY=$secret_key|" .env
    fi
    
    echo "✅ Turnstile keys configured"
else
    # Use test keys
    sed -i.bak "s|CLOUDFLARE_TURNSTILE_SITE_KEY=.*|CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA|" .env
    sed -i.bak "s|CLOUDFLARE_TURNSTILE_SECRET_KEY=.*|CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA|" .env
    echo "✅ Test keys configured"
fi

# Clean up backup file
rm -f .env.bak

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Your .env file is ready. Next steps:"
echo "1. Review .env file and update any values if needed"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:4321/contact"
echo ""
echo "📚 See QUICKSTART.md for more details"
