import { Injectable } from '@nestjs/common';
import { Client, ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { microserviceConfig } from '../../config/microservice.config';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { Order } from './entities/order.entity';
import { OrderedItem } from './entities/ordered-item.entity';

@Injectable()
export class OrderService {
  @Client(microserviceConfig)
  private client: ClientProxy;

  constructor(
    @InjectRepository(OrderedItem)
    private orderedItemRepository: Repository<OrderedItem>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async prepareItem(orderItemDto: OrderItemDto) {
    return firstValueFrom(
      this.client.send('inventory.item.prepare.order', orderItemDto),
    );
  }

  async prepareOrderItems(orderItemsDto: OrderItemDto[]) {
    const compensationItems: OrderItemDto[] = [];

    try {
      for (const item of orderItemsDto) {
        await this.prepareItem(item);
        compensationItems.unshift(item);
      }
    } catch (e) {
      await this.refundOrderItems(compensationItems);
      throw e;
    }
  }

  async refundItem(orderItemDto: OrderItemDto) {
    return firstValueFrom(
      this.client.send('inventory.item.refund.order', orderItemDto),
    );
  }

  async refundOrderItems(orderItemsDto: OrderItemDto[]) {
    return Promise.all(orderItemsDto.map((item) => this.refundItem(item)));
  }

  async createOrderedItems(orderItems: OrderItemDto[]) {
    return Promise.all(
      orderItems.map((item) =>
        this.orderedItemRepository.save({
          productId: item.productId,
          quantity: item.quantity,
        }),
      ),
    );
  }

  async createOrder({
    orderItems: items,
    customerName,
    customerPhone,
  }: CreateOrderDto) {
    await this.prepareOrderItems(items);
    const orderedItems = await this.createOrderedItems(items);

    const order = new Order();
    order.customerName = customerName;
    order.orderedItems = orderedItems;
    order.customerPhone = customerPhone;

    return this.orderRepository.save(order);
  }
}
