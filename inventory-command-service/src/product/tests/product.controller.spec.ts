import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from 'nab-test-common';

class ProductServiceMock {
  async createProduct(createProductDto: CreateProductDto) {
    return {
      id: 1,
      ...createProductDto,
    };
  }
}

describe('ProductController', () => {
  let app: TestingModule;
  let productController: ProductController;

  beforeAll(async () => {
    const ProductServiceProvider = {
      provide: ProductService,
      useClass: ProductServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [ProductController, ProductServiceProvider],
    }).compile();
    productController = app.get<ProductController>(ProductController);
  });

  describe('createProduct', () => {
    it('should create product and return proper data', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Macbook Pro',
        color: 'Silver',
        code: 'MBP',
        price: 3000,
        branchId: 1,
      };
      const result = await productController.create(createProductDto);
      expect(result).toStrictEqual({
        id: 1,
        ...createProductDto,
      });
    });
  });
});
