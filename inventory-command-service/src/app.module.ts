import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './domain/item/item.module';
import { ProductModule } from './domain/product/product.module';
import { dbConfig } from './config/db.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ProductModule, ItemModule],
})
export class AppModule {}
