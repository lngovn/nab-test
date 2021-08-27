import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { OrderModule } from './domain/order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), OrderModule],
})
export class AppModule {}
