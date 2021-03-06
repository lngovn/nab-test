import { Controller, UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ProductListDto } from './dto/product.list-dto';
import { ProductService } from './product.service';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('inventory.product.get.products')
  async getProducts(@Payload() productListDto: ProductListDto) {
    return this.productService.getProducts(productListDto);
  }

  @EventPattern('inventory.product.get.product')
  async getProduct(@Payload() { id }: { id: number }) {
    return this.productService.getProduct(id);
  }
}
