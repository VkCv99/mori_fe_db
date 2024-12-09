FROM node:20.18.0-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.9.0
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
