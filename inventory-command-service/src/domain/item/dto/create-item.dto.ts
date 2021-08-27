import { IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsNumber()
  readonly productId: number;
  @IsNumber()
  readonly branchId: number;
  @IsNumber()
  readonly quantity: number;
  @IsNumber()
  readonly price: number;
}
