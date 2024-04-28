FROM docker.arvancloud.ir/node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev --verbose
COPY . .
RUN npm run build

FROM docker.arvancloud.ir/nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/vhost.conf /etc/nginx/conf.d/vhost.conf
RUN rm /etc/nginx/conf.d/default.conf 
COPY --from=build /app/dist /usr/share/nginx/html
ARG EXPOSE_PORT=80
EXPOSE $EXPOSE_PORT
CMD ["nginx", "-g", "daemon off;"]