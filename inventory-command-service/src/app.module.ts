import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { StockModule } from './item/stock.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProductModule, StockModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
