import { IsNumber } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  readonly itemId: number;
  @IsNumber()
  readonly quantity: number;
}
