import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderedItem } from './entities/ordered-item.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import { CreateOrderTransactionSaga } from './sagas/create-order-transaction.saga';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderedItem]), CqrsModule],
  controllers: [OrderController],
  providers: [OrderService, ...CommandHandlers, CreateOrderTransactionSaga],
})
export class OrderModule {}
