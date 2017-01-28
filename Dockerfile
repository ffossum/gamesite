FROM node:6
RUN npm install -g yarn

EXPOSE 8080
EXPOSE 6020

COPY ./package.json /workdir/
COPY ./yarn.lock /workdir/
WORKDIR /workdir
RUN yarn

COPY ./dist/*server.js /workdir/dist/
COPY ./dist/webpack-assets.json /workdir/dist/

CMD npm run start