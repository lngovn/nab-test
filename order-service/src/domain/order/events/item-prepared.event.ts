import { Order } from '../entities/order.entity';
export class ItemPreparedEvent {
  constructor(public readonly order: Order, public readonly colId: string) {}
}
