FROM node:18.16.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
USER node
COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]