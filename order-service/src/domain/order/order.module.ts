import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderedItem } from './entities/ordered-item.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderedItem]), CqrsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
