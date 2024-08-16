FROM node:18

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]