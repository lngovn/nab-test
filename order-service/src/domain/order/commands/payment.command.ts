import { OrderItemDto } from 'src/domain/order/dto/order-item.dto';

export class PaymentCommand {
  constructor(
    public readonly orderItem: OrderItemDto,
    public readonly colId: string,
  ) {}
}
