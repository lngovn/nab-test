import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name!: string;
  @IsString()
  readonly code!: string;
  @IsString()
  readonly color!: string;
  @IsString()
  readonly summary: string;
}
