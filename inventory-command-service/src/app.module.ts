import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ItemModule } from './item/item.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProductModule, ItemModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
