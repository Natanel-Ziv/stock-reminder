FROM node:alpine as base

WORKDIR /stock-reminder

COPY package.json /stock-reminder

<<<<<<< HEAD
RUN cd /stock-reminder && npm install --only=production && npm run build
=======
RUN cd /stock-reminder && npm install --only=production
RUN cd /stock-reminder && npm run build
>>>>>>> 221ea7a... Fix dockerfile

COPY . .

RUN mkdir /config
ENV NODE_ENV=production

CMD ["sh", "-c", "node dist/server.js"]