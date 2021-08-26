import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';

@Controller({
  version: '1',
  path: 'products',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  @MessagePattern('inventory.product.create')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
