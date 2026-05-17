cat <<EOF > /usr/share/nginx/html/config.js
window.__ENV__ = {
  SERVER_PROTOCOL: "${SERVER_PROTOCOL:-http}",
  SERVER_HOST: "${SERVER_HOST:-localhost}",
  SERVER_PORT: "${SERVER_PORT:-5000}",
  SERVER_URL: "${SERVER_URL:-}"
};
EOF

exec nginx -g 'daemon off;'