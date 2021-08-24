import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceConfig } from './microservice-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(microserviceConfig);

  app.setGlobalPrefix('api');
  app.startAllMicroservices();
  await app.listen(8080);
}
bootstrap();
