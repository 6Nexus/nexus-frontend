FROM node:18 AS builder

WORKDIR /app

COPY nexus-frontend/package*.json ./
RUN npm install

COPY nexus-frontend/ ./
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/nexus-frontend/build ./
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]