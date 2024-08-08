#!/bin/bash

/docker-entrypoint.sh
cd /app
composer install
php artisan migrate
npm install
npm run build

chown -R www-data:www-data /app \
    && chmod -R 755 /app \
    && chmod -R 775 /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/database /app/database/*.sqlite

php artisan config:cache
php artisan route:cache

php-fpm