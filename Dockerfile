FROM node:alpine as base

WORKDIR /stock-reminder

COPY package.json /stock-reminder

RUN npm install --only=production
RUN npm run build

COPY . .

RUN mkdir /config
ENV NODE_ENV=production

CMD ["sh", "-c", "node dist/server.js"]