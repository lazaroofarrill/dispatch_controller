FROM node:18-alpine
LABEL authors="lazaroofarrill"

WORKDIR /opt/app
COPY package.json .
COPY yarn.lock .

RUN yarn install -D
COPY . .
RUN yarn build


RUN chmod +x /opt/app/startup.sh

ENTRYPOINT ["/opt/app/startup.sh"]

CMD yarn start
