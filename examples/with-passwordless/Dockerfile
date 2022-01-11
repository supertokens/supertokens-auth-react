FROM node:lts-alpine3.12

RUN apk add curl

WORKDIR /usr/src/app

RUN npm i -g pm2

USER node

CMD ["pm2-docker", "start", "pm2.json"]

EXPOSE 10000

EXPOSE 10001