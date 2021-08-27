import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { microserviceConfig } from 'src/config/microservice.config';
import { getRepository } from 'typeorm';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { OrderItemDto } from '../../dto/order-item.dto';
import { Order } from '../../entities/order.entity';
import { OrderedItem } from '../../entities/ordered-item.entity';
import { CreateOrderFailedEvent } from '../../events/create-order-failed.event';
import { ItemPreparedFailedEvent } from '../../events/item-prepared-fail.event';
import { ItemPreparedEvent } from '../../events/item-prepared.event';
import { PrepareOrderCommand } from '../prepare-order.command';

@CommandHandler(PrepareOrderCommand)
export class PrepareOrderCommandHandler
  implements ICommandHandler<PrepareOrderCommand>
{
  @Client(microserviceConfig)
  private client: ClientProxy;

  constructor(private eventBus: EventBus) {}

  async checkItem(orderItem: OrderItemDto) {
    return firstValueFrom(
      this.client.send('inventory.item.prepare.order', orderItem),
    );
  }

  async refundItem(orderItem: OrderItemDto) {
    return firstValueFrom(
      this.client.send('inventory.item.refund.order', orderItem),
    );
  }

  createOrderItem(item: OrderItemDto) {
    const newItem = new OrderedItem();
    newItem.productId = item.productId;
    newItem.quantity = item.quantity;
    return getRepository(OrderedItem).save(newItem);
  }

  async createOrderItes(items: OrderItemDto[]) {
    return Promise.all(items.map((item) => this.createOrderItem(item)));
  }

  async createOrderFromDto(createOrderDto: CreateOrderDto) {
    const items = await this.createOrderItes(createOrderDto.orderItems);

    const order = new Order();
    order.customerName = createOrderDto.customerName;
    order.customerPhone = createOrderDto.customerPhone;
    order.orderedItems = items;

    return getRepository(Order).save(order);
  }

  async execute(command: PrepareOrderCommand) {
    const { createOrderDto, colId } = command;
    const compensations = [];
    try {
      for (const item of createOrderDto.orderItems) {
        await this.checkItem(item);
        compensations.push(item);
      }
      const order = await this.createOrderFromDto(createOrderDto);

      this.eventBus.publish(new ItemPreparedEvent(order, colId));
      return order;
    } catch (e) {
      this.eventBus.publish(
        new CreateOrderFailedEvent(compensations, e, colId),
      );
    }
  }
}
