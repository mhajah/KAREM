FROM --platform=linux/arm64/v8 node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
EXPOSE 5173

COPY . .

CMD ["npm", "run", "dev"]
