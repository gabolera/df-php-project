#!/bin/sh

cd /var/www

wait_pgsql() {
  while ! nc -z db 5432; do
    echo "Aguardando postgres iniciar..."
    sleep 2
  done
}
wait_pgsql

php artisan key:generate
php artisan migrate
php artisan config:cache
php artisan route:cache
php artisan view:cache
php-fpm
