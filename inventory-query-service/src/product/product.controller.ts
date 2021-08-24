import {
  Controller,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductListDto } from './dto/product.list-dto';
import { ProductService } from './product.service';
@Controller({
  version: '1',
  path: 'products',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('get.products')
  async getProducts(@Payload('value') productListDto: ProductListDto) {
    return this.productService.getProducts(productListDto);
  }

  @EventPattern('get.products.id')
  async getProduct(@Payload('value') { id }: { id: number }) {
    return this.productService.getProduct(id);
  }
}
