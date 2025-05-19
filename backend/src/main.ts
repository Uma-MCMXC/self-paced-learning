// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ เปิดใช้งาน CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true, // ถ้ามีการใช้ cookie/token
  });

  await app.listen(3000);
}
bootstrap();
