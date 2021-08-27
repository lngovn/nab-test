import { ProductService } from '../product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';

describe('ProductService', () => {
  let app: TestingModule;
  let productService: ProductService;
  let productRepository: Repository<Product>;

  const createProductDto: CreateProductDto = {
    name: 'Macbook Pro',
    color: 'Silver',
    code: 'MBP',
    summary: 'mnock-summary',
  };

  beforeAll(async () => {
    const ProductRepositoryProvider = {
      provide: getRepositoryToken(Product),
      useFactory: jest.fn(() => ({
        save: jest.fn(),
      })),
    };

    app = await Test.createTestingModule({
      providers: [ProductService, ProductRepositoryProvider],
    }).compile();
    productService = app.get<ProductService>(ProductService);
    productRepository = app.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  describe('createProduct', () => {
    it('should return product on create success', async () => {
      const createdProduct: Product = {
        id: 1,
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(productRepository, 'save')
        .mockReturnValue(Promise.resolve(createdProduct));

      const product = await productService.createProduct(createProductDto);
      expect(product).toStrictEqual(createdProduct);
    });
  });
});
