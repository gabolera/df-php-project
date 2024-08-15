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
COPY docker/artisan /var/www/artisan
COPY docker/index.php /var/www/public/index.php
RUN COMPOSER_VENDOR_DIR="/var/vendor" composer install
RUN chmod -R 777 /var/www/storage


# RUN apt-get -y update && apt-get -y install build-essential autoconf libcurl4-openssl-dev --no-install-recommends
# RUN mkdir -p /home/apm-agent && \
#     cd /home/apm-agent && \
#     git clone https://github.com/elastic/apm-agent-php.git apm && \
#     cd apm/src/ext && \
#     /usr/local/bin/phpize && ./configure --enable-elastic_apm && \
#     make clean && make && make install
# COPY ./docker/elastic_apm.ini /usr/local/etc/php/conf.d/elastic_apm.ini
# RUN mkdir /app



COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]
