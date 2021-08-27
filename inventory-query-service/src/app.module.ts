import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { ProductModule } from './domain/product/product.module';
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ProductModule],
})
export class AppModule {}
