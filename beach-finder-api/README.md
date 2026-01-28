# Beach Finder API - Deployment Guide

## Quick Deploy to Oracle AMD 2

```bash
# 1. Copy files to server
scp -r beach-finder-api ubuntu@92.5.82.192:~/

# 2. SSH to server
ssh oracle-amd-2

# 3. Install dependencies
cd ~/beach-finder-api
npm install

# 4. Install PM2 globally (if not installed)
sudo npm install -g pm2

# 5. Create logs directory
mkdir -p ~/logs

# 6. Start the app
pm2 start ecosystem.config.cjs
pm2 save

# 7. Install Caddy (if not installed)
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# 8. Configure Caddy
sudo cp Caddyfile /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

## DNS Setup
Add A record: `api.trivabeach` → `92.5.82.192`

## Test
```bash
curl https://api.trivabeach.gazzar.de/health
```
