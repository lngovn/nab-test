import { Order } from '../../order/entities/order.entity';

export class CreateOrderSuccessEvent {
  constructor(public readonly order: Order, public readonly colId: string) {}
}
