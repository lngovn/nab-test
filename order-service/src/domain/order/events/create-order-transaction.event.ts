import { CreateOrderDto } from 'src/domain/order/dto/create-order.dto';

export class CreateOrderTransactionEvent {
  constructor(
    public readonly createOrderDto: CreateOrderDto,
    public readonly colId: string,
  ) {}
}
