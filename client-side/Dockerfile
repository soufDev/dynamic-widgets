FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install -g serve
CMD serve -s build
EXPOSE 5000

COPY package.json  package.json
RUN npm install

COPY . .

RUN npm run build --production