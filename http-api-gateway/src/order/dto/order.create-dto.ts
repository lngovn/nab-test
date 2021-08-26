import { IsNumber, ValidateNested } from 'class-validator';

export class OrderedItemDto {
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
  readonly orderedItems: OrderedItemDto[];
}
