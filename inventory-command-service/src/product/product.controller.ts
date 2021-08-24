import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, TransformInterceptor } from 'nab-test-common';

@Controller({
  version: '1',
  path: 'products',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(TransformInterceptor)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
