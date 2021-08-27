import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Branch } from './entities/branch.entity';
import { Item } from './entities/item.entity';
import { ItemController } from './item.controller';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Branch, Product, ItemRepository])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
