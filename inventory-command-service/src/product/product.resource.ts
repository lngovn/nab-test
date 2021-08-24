import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { ProductCreatedEventDto } from 'nab-test-common';
import { microserviceConfig } from '../microservice-config';
import { KAFKA_TOPIC } from './const';

@Injectable()
export class ProductResource {
  @Client(microserviceConfig)
  client: ClientKafka;

  emitCreatedEvent(product: ProductCreatedEventDto) {
    return this.client.emit(KAFKA_TOPIC.PRODUCT_CREATED, product);
  }
}
