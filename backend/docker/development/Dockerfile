# ใช้ PHP 8.2 พร้อม FPM
FROM php:8.2-fpm

# ตั้งค่า working directory
WORKDIR /var/www

# ติดตั้ง dependencies ที่จำเป็น
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    curl \
    git \
    libpq-dev \
    nginx \
    supervisor \
    && docker-php-ext-install pdo pdo_pgsql gd

# ติดตั้ง Node.js และ npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# ติดตั้ง Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# คัดลอกไฟล์ Laravel และติดตั้ง dependencies
COPY . .
RUN composer install --no-interaction --optimize-autoloader

# ตั้งค่า permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# เปิดพอร์ต 9000 สำหรับ PHP-FPM
EXPOSE 9000

# คัดลอกไฟล์ Config ของ Supervisor
COPY ./docker/development/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# ใช้ Supervisor เพื่อจัดการ Process
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
