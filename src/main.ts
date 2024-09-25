import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './common/filters/exception.filters';
import { Config } from './common/config/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'debug', 'error', 'warn'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');

  await app.listen(Config.Port ?? 5000);
  Logger.debug(
    `Application is running on: ${await app.getUrl()}`,
    bootstrap.name,
  );
}
bootstrap();
