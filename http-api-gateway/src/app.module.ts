import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { ItemModule } from './inventory/item/item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [InventoryModule, OrderModule, ItemModule],
})
export class AppModule {}
