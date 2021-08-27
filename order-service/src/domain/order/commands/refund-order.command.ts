import { OrderItemDto } from 'src/domain/order/dto/order-item.dto';

export class RefundOrderCommand {
  constructor(
    public readonly orderItem: OrderItemDto,
    public readonly colId: string,
  ) {}
}
