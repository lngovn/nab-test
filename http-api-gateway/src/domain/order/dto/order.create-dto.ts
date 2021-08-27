import { IsNumber, ValidateNested } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  productId: number;
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  readonly customerName: string;
  @IsNumber()
  readonly customerPhone: string;
  @ValidateNested({ each: true })
  readonly orderItems: OrderItemDto[];
}
