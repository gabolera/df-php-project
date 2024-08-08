FROM php:8.2-fpm

# Atualizar e instalar dependências
RUN apt-get update -y && apt-get install -y \
    libz-dev \
    libpng-dev \
    libjpeg-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libxslt-dev \
    libxslt1-dev \
    zip \
    unzip

# Instalar e configurar extensões PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

RUN docker-php-ext-install bcmath ctype fileinfo json mbstring openssl pdo tokenizer xml xsl zip

# Instalar a extensão Redis
RUN pecl install redis \
    && docker-php-ext-enable redis

# Instalar Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Copiar Composer da imagem oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar e configurar o script de entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]