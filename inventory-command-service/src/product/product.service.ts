import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'nab-test-common';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const branch = await this.branchRepository.findOne(
      createProductDto.branchId,
    );

    if (!branch) {
      throw new NotFoundException(
        `Cannot find branch with id [${createProductDto.branchId}]`,
      );
    }

    const product = await this.productRepository.save({
      ...createProductDto,
      branch,
    });
    return product;
  }
}
