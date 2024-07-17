# Użyj oficjalnego obrazu Node.js jako bazowy
FROM node:14

# Ustaw katalog roboczy na /app
WORKDIR /app

# Skopiuj package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

# Zainstaluj zależności, w tym TypeScript
RUN npm install

# Skopiuj resztę plików aplikacji do katalogu roboczego
COPY . .

# Skopiuj i skompiluj TypeScript do JavaScript
RUN npm run build

# Otwórz port 3000
EXPOSE 3000

# Uruchom aplikację
CMD ["npm", "start"]
