import { Module } from '@nestjs/common';
import { InventoryModule } from './domain/inventory/inventory.module';
import { ItemModule } from './domain/inventory/item/item.module';
import { OrderModule } from './domain/order/order.module';

@Module({
  imports: [InventoryModule, OrderModule, ItemModule],
})
export class AppModule {}
