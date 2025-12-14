# Environment Setup Script for Goan Traders (Windows PowerShell)
# Run this with: .\setup-env.ps1

Write-Host "🏗️  Goan Traders - Environment Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (Test-Path .env) {
    Write-Host "⚠️  .env file already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/N)"
    if ($overwrite -ne 'y' -and $overwrite -ne 'Y') {
        Write-Host "❌ Setup cancelled." -ForegroundColor Red
        exit 1
    }
}

# Copy from example
if (-not (Test-Path .env.example)) {
    Write-Host "❌ Error: .env.example not found!" -ForegroundColor Red
    exit 1
}

Copy-Item .env.example .env
Write-Host "✅ Created .env file from .env.example" -ForegroundColor Green
Write-Host ""

# Get Discord Webhook
Write-Host "📬 Discord Webhook URL" -ForegroundColor Cyan
Write-Host "Get this from: Discord Server Settings > Integrations > Webhooks"
$discord_url = Read-Host "Enter Discord Webhook URL (or press Enter to skip)"

if ($discord_url) {
    $content = Get-Content .env
    $content = $content -replace 'DISCORD_WEBHOOK_URL=.*', "DISCORD_WEBHOOK_URL=$discord_url"
    $content | Set-Content .env
    Write-Host "✅ Discord webhook configured" -ForegroundColor Green
} else {
    Write-Host "⚠️  Skipped Discord webhook" -ForegroundColor Yellow
}

Write-Host ""

# Get Turnstile keys
Write-Host "🔐 Cloudflare Turnstile Keys" -ForegroundColor Cyan
Write-Host "Get these from: https://dash.cloudflare.com/ > Turnstile"
Write-Host ""
Write-Host "For testing, you can use these test keys:" -ForegroundColor Yellow
Write-Host "Site Key:   1x00000000000000000000AA (always passes)" -ForegroundColor Yellow
Write-Host "Secret Key: 1x0000000000000000000000000000000AA" -ForegroundColor Yellow
Write-Host ""

$use_test = Read-Host "Use test keys? (Y/n)"

if ($use_test -eq 'n' -or $use_test -eq 'N') {
    # Get real keys
    $site_key = Read-Host "Enter Turnstile Site Key"
    $secret_key = Read-Host "Enter Turnstile Secret Key"
    
    $content = Get-Content .env
    
    if ($site_key) {
        $content = $content -replace 'CLOUDFLARE_TURNSTILE_SITE_KEY=.*', "CLOUDFLARE_TURNSTILE_SITE_KEY=$site_key"
    }
    
    if ($secret_key) {
        $content = $content -replace 'CLOUDFLARE_TURNSTILE_SECRET_KEY=.*', "CLOUDFLARE_TURNSTILE_SECRET_KEY=$secret_key"
    }
    
    $content | Set-Content .env
    Write-Host "✅ Turnstile keys configured" -ForegroundColor Green
} else {
    # Use test keys
    $content = Get-Content .env
    $content = $content -replace 'CLOUDFLARE_TURNSTILE_SITE_KEY=.*', 'CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA'
    $content = $content -replace 'CLOUDFLARE_TURNSTILE_SECRET_KEY=.*', 'CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA'
    $content | Set-Content .env
    Write-Host "✅ Test keys configured" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your .env file is ready. Next steps:"
Write-Host "1. Review .env file and update any values if needed"
Write-Host "2. Run: npm install"
Write-Host "3. Run: npm run dev"
Write-Host "4. Visit: http://localhost:4321/contact"
Write-Host ""
Write-Host "📚 See QUICKSTART.md for more details"
