import { Product } from '../../product/entities/product.entity';
import { CreateItemDto } from '../dto/create-item.dto';
import { Branch } from '../entities/branch.entity';
import { Item } from '../entities/item.entity';

export const createItemFromDto = (createItemDto: CreateItemDto) => {
  const product = new Product();
  const branch = new Branch();
  const item = new Item();
  item.product = product;
  item.branch = branch;
  item.price = createItemDto.price;
  item.quantity = createItemDto.quantity;
  return item;
};
