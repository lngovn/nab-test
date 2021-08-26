import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { Branch } from './entities/branch.entity';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createItem(createItemDto: CreateItemDto) {
    const product = await this.productRepository.findOne(
      createItemDto.productId,
    );
    if (!product) {
      throw new RpcException(
        `Cannot find product with id [${createItemDto.productId}]`,
      );
    }

    const branch = await this.branchRepository.findOne(createItemDto.branchId);
    if (!branch) {
      throw new RpcException(
        `Cannot find branch with id [${createItemDto.branchId}]`,
      );
    }

    return this.itemRepository.save({
      product,
      branch,
      quantity: createItemDto.quantity,
      price: createItemDto.price,
    });
  }

  async prepareOrderItem({ itemId, quantity }: OrderItemDto) {
    const item = await this.itemRepository.findOne(itemId);
    if (item.quantity < quantity) {
      throw new RpcException(`Out of product [${item.product.name}]`);
    }
    item.quantity = item.quantity - quantity;
    return this.itemRepository.save(item);
  }

  async refundOrderItem({ itemId, quantity }: OrderItemDto) {
    const item = await this.itemRepository.findOne(itemId);
    item.quantity = item.quantity + quantity;
    return this.itemRepository.save(item);
  }
}
