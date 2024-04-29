FROM node:14

WORKDIR /app

COPY . .

RUN npm install

COPY src/certs/localhost-key.pem src/certs/localhost.pem ./src/certs/

CMD ["node", "src/app.js"]
