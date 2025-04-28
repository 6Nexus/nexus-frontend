
echo "window.ENV = { API_BASE_URL: \"${API_BASE_URL}\" };" > /usr/share/nginx/html/env.js

exec "$@"
