FROM php:8.2-fpm

# System dependencies
RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libzip-dev libicu-dev libonig-dev \
    libfreetype6-dev libjpeg62-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mysqli zip intl gd opcache mbstring \
    && rm -rf /var/lib/apt/lists/*

# PHP configuration
COPY docker/php/php.ini /usr/local/etc/php/conf.d/99-qutaifan.ini

# Set working directory
WORKDIR /var/www/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD php -r "echo 'OK';" || exit 1

EXPOSE 9000
