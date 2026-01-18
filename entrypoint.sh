#!/bin/sh
# Replace env.js with runtime environment variable
echo "window.__ENV__ = { VITE_API_BASE_URL: '${VITE_API_BASE_URL}' };" > /usr/share/nginx/html/env.js

# Start Nginx
exec nginx -g 'daemon off;'