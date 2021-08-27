import { Order } from 'src/domain/order/entities/order.entity';

export class CreateOrderCommand {
  constructor(public readonly order: Order, public readonly colId: string) {}
}
