import { Test, TestingModule } from '@nestjs/testing';
import { CreateItemDto } from '../dto/create-item.dto';
import { OrderItemDto } from '../dto/order-item.dto';
import { ItemController } from '../item.controller';
import { ItemService } from '../item.service';

class MockItemService {
  createItem = jest.fn();
  prepareOrderItem = jest.fn();
  refundOrderItem = jest.fn();
}

const createItemDto: CreateItemDto = {
  productId: 1,
  quantity: 1,
  branchId: 1,
  price: 100,
};

const orderItem: OrderItemDto = {
  productId: 1,
  quantity: 1,
};

describe('ProductController', () => {
  let app: TestingModule;
  let itemController: ItemController;
  let itemService: ItemService;

  beforeAll(async () => {
    const ItemServiceProvider = {
      provide: ItemService,
      useClass: MockItemService,
    };
    app = await Test.createTestingModule({
      providers: [ItemController, ItemServiceProvider],
    }).compile();
    itemController = app.get<ItemController>(ItemController);
    itemService = app.get<ItemService>(ItemService);
  });

  describe('createItem', () => {
    it('should call itemService.createItem with proper input', async () => {
      const spy = jest.spyOn(itemService, 'createItem');

      await itemController.create(createItemDto);

      expect(spy).toHaveBeenCalledWith(createItemDto);
    });
  });

  describe('prepareOrder', () => {
    it('should call itemService.prepareOrderItem with proper input', async () => {
      const spy = jest.spyOn(itemService, 'prepareOrderItem');

      await itemController.prepareOrder(orderItem);

      expect(spy).toHaveBeenCalledWith(orderItem);
    });
  });

  describe('refundOrder', () => {
    it('should call itemService.refundOrder with proper input', async () => {
      const spy = jest.spyOn(itemService, 'refundOrderItem');

      await itemController.refundOrder(orderItem);

      expect(spy).toHaveBeenCalledWith(orderItem);
    });
  });
});
