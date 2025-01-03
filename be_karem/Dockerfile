FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y python3 python3-pip

COPY package*.json ./

RUN npm install

COPY . .

COPY src ./src

RUN npm run build

EXPOSE 5175

CMD ["node", "dist/index.js"]
