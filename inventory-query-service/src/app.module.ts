import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './domain/product/product.module';
@Module({
  imports: [TypeOrmModule.forRoot(), ProductModule],
})
export class AppModule {}
