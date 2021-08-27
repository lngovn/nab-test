import { OrderedItem } from '../entities/ordered-item.entity';

export class CreateOrderFailedEvent {
  constructor(
    public readonly bookedItems: OrderedItem[],
    public readonly error: Error,
    public readonly colId: string,
  ) {}
}
