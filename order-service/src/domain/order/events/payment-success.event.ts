import { Order } from '../../order/entities/order.entity';

export class PaymentSuccessEvent {
  constructor(public readonly order: Order, public readonly colId: string) {}
}
