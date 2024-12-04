FROM node:18-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN apt-get update && apt-get install -y python3 python3-pip

EXPOSE 5175

COPY . .

CMD ["node", "index.js"]
