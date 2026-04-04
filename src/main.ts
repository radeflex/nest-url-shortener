import { NestFactory } from '@nestjs/core';
import { UrlModule } from './url.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UrlModule);
  setupValidationPipe(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

function setupValidationPipe(app) {
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
}