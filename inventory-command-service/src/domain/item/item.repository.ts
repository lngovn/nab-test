import { EntityRepository, Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  findOneByProduct(productId: number) {
    return this.createQueryBuilder()
      .where('product_id = :productId', {
        productId,
      })
      .getOne();
  }
}
