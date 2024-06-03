FROM node:alpine

WORKDIR /order

COPY package*.json ./

RUN npm start

COPY . .

CMD [ "npm","run","dev" ]