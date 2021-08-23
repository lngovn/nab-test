import { IsNumber, IsObject, IsString } from 'class-validator';

export class CreateUserActivityLogDto {
  @IsString()
  readonly activity: string;
  @IsString()
  readonly path: string;
  @IsString()
  readonly params?: unknown;
  @IsNumber()
  readonly query?: unknown;
  @IsNumber()
  readonly body?: unknown;
  @IsObject()
  readonly results?: unknown;
}
