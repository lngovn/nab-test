import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientProxy } from '@nestjs/microservices';
import { microserviceConfig } from 'src/config/microservice.config';
import { RefundOrderCommand } from '../refund-order.command';

@CommandHandler(RefundOrderCommand)
export class RefundOrderCommandHandler
  implements ICommandHandler<RefundOrderCommand>
{
  @Client(microserviceConfig)
  private client: ClientProxy;

  async execute(command: RefundOrderCommand) {
    const { orderItem } = command;
    return this.client.send('inventory.item.refund.order', orderItem);
  }
}
