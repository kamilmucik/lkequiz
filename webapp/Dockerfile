FROM node:16.17.1-slim AS builder

ARG APP_API_URL
ARG APP_ENV

ENV VITE_API_URL=$APP_API_URL
ENV VITE_APP_ENV=$APP_ENV

WORKDIR /app
COPY ./app/ .

RUN rm -rf node_modules package-lock.json

RUN npm install
RUN npm run build

FROM nginx:1.27.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

# # # add env.sh to docker-entrypoint.d
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80 443