import { IsNumber } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  readonly productId: number;
  @IsNumber()
  readonly quantity: number;
}
