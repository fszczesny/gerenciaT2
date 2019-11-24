FROM node

COPY package.json .

RUN npm i

COPY client.js .

ENTRYPOINT [ "node", "client.js" ]