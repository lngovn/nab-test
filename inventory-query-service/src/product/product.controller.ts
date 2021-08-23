import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  Payload,
} from '@nestjs/microservices';
import { microserviceConfig } from 'src/microservice-config';
import { KAFKA_TOPIC } from './const';
import { ProductListDto } from './dto/product.list-dto';
import { ProductService } from './product.service';
import { IncomingMessage, ProductCreatedEventDto, TransformInterceptor } from 'nab-test-common';

@Controller({
  version: '1',
  path: 'products',
})
@UseInterceptors(TransformInterceptor)
export class ProductController {
  @Client(microserviceConfig)
  client: ClientKafka;

  constructor(private readonly productService: ProductService) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA_TOPIC.PRODUCT_CREATED);
  }

  @Get()
  async getProducts(@Query() productListDto: ProductListDto) {
    return this.productService.getProducts(productListDto);
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }

  @EventPattern(KAFKA_TOPIC.PRODUCT_CREATED)
  async createProduct(
    @Payload() { value }: IncomingMessage<ProductCreatedEventDto>,
  ) {
    return this.productService.createProduct(value);
  }
}
