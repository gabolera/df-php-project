#!/bin/sh

cd /var/www

php artisan key:generate
php artisan migrate
npm install
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
php-fpm
