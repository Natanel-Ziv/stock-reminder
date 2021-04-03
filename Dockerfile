FROM node:alpine as base

WORKDIR /stock-reminder

COPY package.json /stock-reminder

RUN cd /stock-reminder && npm -i --only=production

COPY . .

EXPOSE 3023
CMD ["sh", "-c", "node dist/server.js"]