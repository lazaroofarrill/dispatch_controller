FROM node:18-alpine
LABEL authors="lazaroofarrill"

WORKDIR /opt/app
COPY package.json .
COPY yarn.lock .

RUN yarn install -D
COPY . .
RUN yarn build
