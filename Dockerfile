FROM node:6

EXPOSE 8080

COPY ./package.json /workdir/
WORKDIR /workdir
RUN npm install

COPY ./dist/*server.js /workdir/dist/

CMD npm run start