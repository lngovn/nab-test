import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceConfig } from './microservice-config';
import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

async function bootstrap() {
  getConnectionOptions().then((connectionOptions) => {
    return createConnection(
      Object.assign(connectionOptions, {
        namingStrategy: new SnakeNamingStrategy(),
      }),
    );
  });

  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceConfig,
  );

  await app.listen();
}
bootstrap();
