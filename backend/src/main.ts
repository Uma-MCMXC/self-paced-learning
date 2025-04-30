import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // URL ของ Next.js
  });

  await app.listen(3000); // NestJS port
}
bootstrap();
