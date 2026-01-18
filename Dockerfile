FROM node:20 AS build
WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL


COPY package*.json ./
RUN npm ci

COPY . .


RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]