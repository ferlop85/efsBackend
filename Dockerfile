FROM node:18.15.0-alpine

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]

