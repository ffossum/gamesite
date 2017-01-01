FROM node:6

EXPOSE 8080
EXPOSE 6020

COPY ./package.json /workdir/
WORKDIR /workdir
RUN npm install

COPY ./dist/*server.js /workdir/dist/
COPY ./dist/webpack-assets.json /workdir/dist/

CMD npm run start