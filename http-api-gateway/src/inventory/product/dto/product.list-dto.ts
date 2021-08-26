import { IsNumber, IsString } from 'class-validator';

export class ProductListDto {
  @IsString()
  readonly color?: string;
  @IsNumber()
  readonly branchId?: number;
  @IsString()
  readonly name?: string;
  @IsString()
  readonly orderBy?: string;
  @IsString()
  readonly direction?: 'DESC' | 'ASC';
}
