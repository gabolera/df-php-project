#!/bin/sh

cd /app

php artisan migrate
npm install
npm run build
php-fpm
