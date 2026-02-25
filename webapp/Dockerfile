FROM nginx:1.27.0-alpine
COPY /dist /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

# # # add env.sh to docker-entrypoint.d
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80 443