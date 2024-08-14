#!/bin/sh

wait_rabbitmq() {
  while ! nc -z amqp 5672; do
    echo "Aguardando RabbitMQ iniciar..."
    sleep 2
  done
}

wait_rabbitmq

cd /app

npm install
npm run build
npm run start
