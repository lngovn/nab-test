import { ProductService } from '../product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from 'nab-test-common';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Branch } from '../entities/branch.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let app: TestingModule;
  let productService: ProductService;
  let productRepository: Repository<Product>;
  let branchRepository: Repository<Branch>;

  beforeAll(async () => {
    const ProductRepositoryProvider = {
      provide: getRepositoryToken(Product),
      useFactory: jest.fn(() => ({
        save: jest.fn(),
      })),
    };
    const BranchRepositoryProvider = {
      provide: getRepositoryToken(Branch),
      useFactory: jest.fn(() => ({
        findOne: jest.fn(),
      })),
    };
    app = await Test.createTestingModule({
      providers: [
        ProductService,
        ProductRepositoryProvider,
        BranchRepositoryProvider,
      ],
    }).compile();
    productService = app.get<ProductService>(ProductService);
    productRepository = app.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    branchRepository = app.get<Repository<Branch>>(getRepositoryToken(Branch));
  });

  describe('createProduct', () => {
    it('should throw NotFoundException if branch id is invalid', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Macbook Pro',
        color: 'Silver',
        code: 'MBP',
        price: 3000,
        branchId: 1,
      };
      jest
        .spyOn(branchRepository, 'findOne')
        .mockImplementation(() => undefined);
      try {
        await productService.createProduct(createProductDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return product on create success', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Macbook Pro',
        color: 'Silver',
        code: 'MBP',
        price: 3000,
        branchId: 1,
      };
      const branch = { id: 1, name: 'Mock Branch', code: 'MOCK' };
      const createdProduct: Product = {
        id: 1,
        ...createProductDto,
        branch,
      };
      jest
        .spyOn(branchRepository, 'findOne')
        .mockReturnValue(Promise.resolve(branch));
      jest
        .spyOn(productRepository, 'save')
        .mockReturnValue(Promise.resolve(createdProduct));

      const product = await productService.createProduct(createProductDto);
      expect(product).toStrictEqual(createdProduct);
    });
  });
});
