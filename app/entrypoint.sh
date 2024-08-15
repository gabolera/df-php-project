#!/bin/sh

cd /app

composer install
php artisan migrate
npm install
npm run build
php-fpm
