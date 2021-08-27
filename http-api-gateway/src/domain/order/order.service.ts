import { Injectable } from '@nestjs/common';
import { Client, ClientProxy } from '@nestjs/microservices';
import { microserviceConfig } from 'src/config/microservice.config';
import { CreateOrderDto } from './dto/order.create-dto';

@Injectable()
export class OrderService {
  @Client(microserviceConfig)
  private client: ClientProxy;

  createOrder(createOrderDto: CreateOrderDto) {
    return this.client.send('order.order.create', createOrderDto);
  }
}
