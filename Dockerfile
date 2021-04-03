FROM node:alpine as base

WORKDIR /stock-reminder

COPY package.json /stock-reminder

RUN cd /stock-reminder && npm install --only=production
RUN cd /stock-reminder && npm run build

COPY . .

RUN mkdir /config
ENV NODE_ENV=production

CMD ["sh", "-c", "node dist/server.js"]