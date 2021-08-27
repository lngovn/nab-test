import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientProxy } from '@nestjs/microservices';
import { microserviceConfig } from 'src/config/microservice.config';
import { PaymentCommand } from '../payment.command';

@CommandHandler(PaymentCommand)
export class PaymentCommandHandler implements ICommandHandler<PaymentCommand> {
  @Client(microserviceConfig)
  private client: ClientProxy;

  async execute(command: PaymentCommand) {
    console.log('Mock payment here!!!');
    return {
      status: 'success',
    };
  }
}
