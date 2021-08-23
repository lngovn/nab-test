import { EntityRepository, Repository } from 'typeorm';
import { ProductListDto } from './dto/product.list-dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProducts({
    color,
    name,
    branchId,
    orderBy,
    direction = 'ASC',
  }: ProductListDto) {
    const queryBuilder = this.createQueryBuilder();

    if (color) {
      queryBuilder.andWhere('color = :color', { color });
    }

    if (branchId) {
      queryBuilder.andWhere('branch_id = :branchId', { branchId });
    }

    if (name) {
      queryBuilder.andWhere('name ILIKE :name', { name: `%${name}%` });
    }

    if (orderBy) {
      queryBuilder.orderBy(orderBy, direction);
    }

    return queryBuilder.getMany();
  }
}
