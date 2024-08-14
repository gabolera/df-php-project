
FROM node:18

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -g pm2
RUN npm install

COPY . .

COPY entrypoint-node.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]