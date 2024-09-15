FROM node:20.14.0

WORKDIR /app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]