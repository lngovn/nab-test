import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { OrderedItem } from './entities/ordered-item.entity';
import { EventBus, ofType } from '@nestjs/cqrs';
import { every, filter, firstValueFrom, groupBy, map } from 'rxjs';
import { CreateOrderTransactionEvent } from './events/create-order-transaction.event';
import { CreateOrderSuccessEvent } from './events/create-order-success.event';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderFailedEvent } from './events/create-order-failed.event';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderedItem)
    private orderedItemRepository: Repository<OrderedItem>,
    private eventBus: EventBus,
  ) {}

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

  getValueFromCreateOrderSuccessEvent(collerationId: string) {
    return firstValueFrom(
      this.eventBus.pipe(
        ofType(CreateOrderSuccessEvent),
        filter(({ colId }) => colId === collerationId),
        map(({ order }) => order),
      ),
    );
  }

  getValueFromCreateOrderFailedEvent(collerationId: string) {
    return firstValueFrom(
      this.eventBus.pipe(
        ofType(CreateOrderFailedEvent),
        filter(({ colId }) => colId === collerationId),
        map(({ error }) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const collerationId = uuidv4();
    this.eventBus.publish(
      new CreateOrderTransactionEvent(createOrderDto, collerationId),
    );
    return Promise.race([
      this.getValueFromCreateOrderFailedEvent(collerationId),
      this.getValueFromCreateOrderSuccessEvent(collerationId),
    ]);
  }
}
