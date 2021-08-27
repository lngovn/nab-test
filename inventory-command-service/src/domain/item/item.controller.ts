import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateItemDto } from './dto/create-item.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { ItemService } from './item.service';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  // @Post()
  @MessagePattern('inventory.item.create')
  create(@Payload() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }

  // @Put()
  @MessagePattern('inventory.item.prepare.order')
  prepareOrder(@Payload() orderItemDto: OrderItemDto) {
    console.log('receive message: ', orderItemDto);
    return this.itemService.prepareOrderItem(orderItemDto);
  }

  // @Put()
  @MessagePattern('inventory.item.refund.order')
  refundOrder(@Payload() orderItemDto: OrderItemDto) {
    return this.itemService.refundOrderItem(orderItemDto);
  }
}
