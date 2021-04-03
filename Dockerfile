FROM node:alpine as base

WORKDIR /stock-reminder

COPY package.json /stock-reminder

RUN npm install

COPY . .

RUN npm run build

RUN mkdir /config
ENV NODE_ENV=production

CMD ["sh", "-c", "node dist/server.js"]