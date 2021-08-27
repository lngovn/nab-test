import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceConfig } from './config/microservice.config';
import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceConfig,
  );

  await app.listen();
}
bootstrap();
