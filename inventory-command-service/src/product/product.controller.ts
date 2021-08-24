import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, IncomingMessage } from 'nab-test-common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller({
  version: '1',
  path: 'products',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  @MessagePattern('create.product')
  create(@Payload('value') createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
