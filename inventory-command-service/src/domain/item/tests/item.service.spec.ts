import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from '../dto/create-item.dto';
import { Branch } from '../entities/branch.entity';
import { ItemRepository } from '../item.repository';
import { ItemService } from '../item.service';
import { createItemFromDto } from '../utils/test.util';
import { RpcException } from '@nestjs/microservices';
import { OrderItemDto } from '../dto/order-item.dto';
import { Item } from '../entities/item.entity';

describe('ItemService', () => {
  let app: TestingModule;
  let itemService: ItemService;
  let itemRepository: ItemRepository;
  let branchRepository: Repository<Branch>;
  let productRepository: Repository<Product>;

  const createItemDto: CreateItemDto = {
    productId: 1,
    branchId: 1,
    price: 100,
    quantity: 1,
  };

  const orderItemDto: OrderItemDto = {
    productId: 1,
    quantity: 1,
  };

  beforeAll(async () => {
    const ItemRepositoryProvider = {
      provide: ItemRepository,
      useFactory: jest.fn(() => ({
        save: jest.fn(),
        findOneByProduct: jest.fn(),
      })),
    };

    const BranchRepositoryProvider = {
      provide: getRepositoryToken(Branch),
      useFactory: jest.fn(() => ({
        findOne: jest.fn(),
      })),
    };

    const ProductRepositoryProvider = {
      provide: getRepositoryToken(Product),
      useFactory: jest.fn(() => ({
        findOne: jest.fn(),
      })),
    };

    app = await Test.createTestingModule({
      providers: [
        ItemService,
        ItemRepositoryProvider,
        BranchRepositoryProvider,
        ProductRepositoryProvider,
      ],
    }).compile();
    itemService = app.get<ItemService>(ItemService);
    itemRepository = app.get<ItemRepository>(ItemRepository);
    branchRepository = app.get<Repository<Branch>>(getRepositoryToken(Branch));
    productRepository = app.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  describe('createItem', () => {
    it('should return item on create success', async () => {
      const item = createItemFromDto(createItemDto);
      jest
        .spyOn(branchRepository, 'findOne')
        .mockReturnValue(Promise.resolve(item.branch));

      jest
        .spyOn(productRepository, 'findOne')
        .mockReturnValue(Promise.resolve(item.product));

      jest.spyOn(itemRepository, 'save').mockReturnValue(Promise.resolve(item));

      expect(await itemService.createItem(createItemDto)).toBe(item);
    });

    it('should throw RPC exception if product not found', async () => {
      jest
        .spyOn(productRepository, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));
      try {
        await itemService.createItem(createItemDto);
      } catch (e) {
        expect(e).toBeInstanceOf(RpcException);
      }
    });

    it('should throw RPC exception if branch not found', async () => {
      jest
        .spyOn(productRepository, 'findOne')
        .mockReturnValue(Promise.resolve(new Product()));
      jest
        .spyOn(branchRepository, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));
      try {
        await itemService.createItem(createItemDto);
      } catch (e) {
        expect(e).toBeInstanceOf(RpcException);
      }
    });
  });

  describe('prepareOrderItem', () => {
    it('should return item on prepare success', async () => {
      const item = createItemFromDto(createItemDto);
      jest
        .spyOn(itemRepository, 'findOneByProduct')
        .mockReturnValue(Promise.resolve({ ...item }));

      jest.spyOn(itemRepository, 'save').mockImplementation((input) =>
        Promise.resolve({
          id: 1,
          ...input,
        } as Item),
      );

      const itemAfter = await itemService.prepareOrderItem(orderItemDto);

      expect(itemAfter).toStrictEqual({
        id: 1,
        ...item,
        quantity: item.quantity - orderItemDto.quantity,
      });
    });

    it('should throw RPC error if product not found', async () => {
      jest
        .spyOn(itemRepository, 'findOneByProduct')
        .mockResolvedValue(undefined);
      try {
        await itemService.prepareOrderItem(orderItemDto);
      } catch (e) {
        expect(e).toBeInstanceOf(RpcException);
      }
    });

    it('should throw RPC error if quantity is not available', async () => {
      const item = createItemFromDto(createItemDto);
      jest.spyOn(itemRepository, 'findOneByProduct').mockResolvedValue(item);

      const newOrderItemDto = {
        ...orderItemDto,
        quantity: 2,
      };

      try {
        await itemService.prepareOrderItem(newOrderItemDto);
      } catch (e) {
        expect(e).toBeInstanceOf(RpcException);
      }
    });
  });

  describe('refundOrderItem', () => {
    it('should return item on refund success', async () => {
      const item = createItemFromDto(createItemDto);
      jest
        .spyOn(itemRepository, 'findOneByProduct')
        .mockReturnValue(Promise.resolve(item));

      jest.spyOn(itemRepository, 'save').mockResolvedValue(item);

      expect(await itemService.refundOrderItem(orderItemDto)).toBe(item);
    });

    it('should throw RPC error if product not found', async () => {
      jest
        .spyOn(itemRepository, 'findOneByProduct')
        .mockResolvedValue(undefined);
      try {
        await itemService.refundOrderItem(orderItemDto);
      } catch (e) {
        expect(e).toBeInstanceOf(RpcException);
      }
    });
  });
});
