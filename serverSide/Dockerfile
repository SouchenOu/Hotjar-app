#FROM eu.gcr.io/avito-registry/node:20-alpine
FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "npm install && npm start"]