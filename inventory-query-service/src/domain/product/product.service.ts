import { Injectable } from '@nestjs/common';
import { ProductListDto } from './dto/product.list-dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProduct(id: number) {
    const product = await this.productRepository.findOne(id);
    return { ...product };
  }

  async getProducts(productListDto: ProductListDto) {
    return this.productRepository.getProducts(productListDto);
  }
}
