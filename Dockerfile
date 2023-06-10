FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install yarn

RUN yarn install

COPY . .

EXPOSE 3000 

RUN yarn add @prisma/client

CMD [ "yarn", "migrate:run" ]

