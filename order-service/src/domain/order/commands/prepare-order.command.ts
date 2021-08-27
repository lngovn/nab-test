import { CreateOrderDto } from '../dto/create-order.dto';

export class PrepareOrderCommand {
  constructor(
    public readonly createOrderDto: CreateOrderDto,
    public readonly colId: string,
  ) {}
}
