import { Order } from '../../order/entities/order.entity';

export class PaymentFailedEvent {
  constructor(public readonly order: Order, public readonly colId: string) {}
}
