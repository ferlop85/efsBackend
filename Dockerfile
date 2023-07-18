FROM node:18.14.2-alpine

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]

