FROM node:alpine

WORKDIR /gateway

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2000

CMD [ "npm","run","dev" ]