FROM node:20.5

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000 3001

CMD [ "npm", "run", "start"]