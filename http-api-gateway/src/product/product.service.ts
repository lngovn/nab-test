import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { CreateProductDto } from 'nab-test-common';
import { microserviceConfig } from 'src/microservice-config';
import { ProductListDto } from './dto/product.list-dto';

@Injectable()
export class ProductService {
  @Client(microserviceConfig)
  private client: ClientKafka;

  private readonly topics = [
    'create.product',
    'get.products',
    'get.products.id',
  ];

  async onModuleInit() {
    this.topics.forEach((topic) => this.client.subscribeToResponseOf(topic));
  }

  createProduct(createProductDto: CreateProductDto) {
    return this.client.send('create.product', createProductDto);
  }

  getProducts(productListDto: ProductListDto) {
    return this.client.send('get.products', productListDto);
  }

  getProductById(id: number) {
    return this.client.send('get.products.id', { id });
  }
}
