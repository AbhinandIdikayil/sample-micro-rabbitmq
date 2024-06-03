FROM node:alpine

WORKDIR /order

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm","run","dev" ]