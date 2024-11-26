#FROM eu.gcr.io/avito-registry/node:20-alpine
FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm install && npm start"]
