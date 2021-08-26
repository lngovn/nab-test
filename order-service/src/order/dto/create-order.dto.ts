import { IsNumber, ValidateNested } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsNumber()
  readonly customerName: string;
  @IsNumber()
  readonly customerPhone: string;
  @ValidateNested({ each: true })
  readonly orderItems: OrderItemDto[];
}
