import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.create-dto';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }
}
