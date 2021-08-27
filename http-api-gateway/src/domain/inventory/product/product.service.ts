import { Injectable } from '@nestjs/common';
import { Client, ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from 'nab-test-common';
import { microserviceConfig } from 'src/config/microservice.config';
import { ProductListDto } from './dto/product.list-dto';

@Injectable()
export class ProductService {
  @Client(microserviceConfig)
  private client: ClientProxy;

  createProduct(createProductDto: CreateProductDto) {
    return this.client.send('inventory.product.create', createProductDto);
  }

  getProducts(productListDto: ProductListDto) {
    return this.client.send('inventory.product.get.products', productListDto);
  }

  getProductById(id: number) {
    return this.client.send('inventory.product.get.product', { id });
  }
}
