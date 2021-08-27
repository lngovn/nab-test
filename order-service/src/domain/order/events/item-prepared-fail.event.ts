import { CreateOrderDto } from '../dto/create-order.dto';

export class ItemPreparedFailedEvent {
  constructor(
    public readonly createOrderDto: CreateOrderDto,
    public readonly colId: string,
  ) {}
}
