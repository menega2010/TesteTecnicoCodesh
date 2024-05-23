FROM node:20

RUN npm install -g npm@10.5.2

WORKDIR /usr/app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]