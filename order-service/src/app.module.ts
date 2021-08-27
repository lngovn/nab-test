import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './domain/order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(), OrderModule],
})
export class AppModule {}
