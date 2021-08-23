import { Module } from '@nestjs/common';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResource } from './product.resource';
import { Branch } from './entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Branch])],
  controllers: [ProductController],
  providers: [ProductService, ProductResource],
})
export class ProductModule {}
