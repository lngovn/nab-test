import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { Branch } from './entities/branch.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(
    private itemRepository: ItemRepository,
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

  async prepareOrderItem({ productId, quantity }: OrderItemDto) {
    const item = await this.itemRepository.findOneByProduct(productId);
    if (!item) {
      throw new RpcException(
        `Product id [${productId}] has not been added to inventory.`,
      );
    }
    if (item.quantity < quantity) {
      throw new RpcException(`Out of product [${item.product.name}]`);
    }
    item.quantity = item.quantity - quantity;
    return this.itemRepository.save(item);
  }

  async refundOrderItem({ productId, quantity }: OrderItemDto) {
    const item = await this.itemRepository.findOneByProduct(productId);
    if (!item) {
      throw new RpcException(
        `Product id [${productId}] has not been added to inventory.`,
      );
    }
    item.quantity = item.quantity + quantity;
    return this.itemRepository.save(item);
  }
}
