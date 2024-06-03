FROM node:alpine

WORKDIR /product

COPY package*.json ./

RUN npm start

COPY . .

CMD [ "npm","run","dev" ]