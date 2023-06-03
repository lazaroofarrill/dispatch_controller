FROM node:18-alpine
LABEL authors="lazaroofarrill"

ENV YARN_CACHE_FOLDER /yarn

WORKDIR /opt/app
COPY package.json .
COPY yarn.lock .
COPY docker/app/startup-scripts/yarn-cache.sh /usr/local/bin
RUN chmod +x /usr/local/bin/yarn-cache.sh
RUN /usr/local/bin/yarn-cache.sh

RUN yarn install -D
COPY . .
RUN yarn build
