import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'nab-test-common';
import { ProductListDto } from './dto/product.list-dto';
import { map } from 'rxjs';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  getProducts(@Query() productListDto: ProductListDto) {
    return this.productService.getProducts(productListDto);
  }

  @Get(':id')
  async getProductById(@Param() id: number) {
    return this.productService.getProductById(id);
  }
}
