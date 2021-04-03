FROM node:alpine as base

WORKDIR /stock-reminder

COPY package.json /stock-reminder

RUN cd /stock-reminder && npm install --only=production && npm build

COPY . .

RUN mkdir /config
ENV NODE_ENV=production

CMD ["sh", "-c", "node dist/server.js"]