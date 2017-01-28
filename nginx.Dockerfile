FROM nginx:1-alpine

RUN apk add --no-cache gzip

EXPOSE 80

COPY ./nginx.conf /etc/nginx/
COPY ./static/ /www/data/static/

WORKDIR /www/data/static/

RUN gzip -k -r -- *
