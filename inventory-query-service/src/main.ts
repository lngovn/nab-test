import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceConfig } from './microservice-config';
import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  getConnectionOptions().then((connectionOptions) => {
    return createConnection(
      Object.assign(connectionOptions, {
        namingStrategy: new SnakeNamingStrategy(),
      }),
    );
  });

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(microserviceConfig);

  app.setGlobalPrefix('api');
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
