import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/domain/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderFailedEvent } from '../../events/create-order-failed.event';
import { CreateOrderSuccessEvent } from '../../events/create-order-success.event';
import { CreateOrderCommand } from '../create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateOrderCommand) {
    const { order, colId } = command;

    try {
      const newOrder = await this.orderRepository.save(order);
      return this.eventBus.publish(
        new CreateOrderSuccessEvent(newOrder, colId),
      );
    } catch (e) {
      return this.eventBus.publish(
        new CreateOrderFailedEvent(order.orderedItems, e, colId),
      );
    }
  }
}
