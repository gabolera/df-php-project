FROM php:8.2-fpm

COPY --chown=www:www --chmod=644 composer.lock composer.json /var/www/
WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libzip-dev \
    libpq-dev \
    libonig-dev \
    libicu-dev \
    libxslt1-dev

RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo_pgsql mbstring zip exif pcntl bcmath
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www
COPY docker-files/artisan /var/www/artisan
COPY docker-files/index.php /var/www/public/index.php
RUN COMPOSER_VENDOR_DIR="/var/vendor" composer install

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]
