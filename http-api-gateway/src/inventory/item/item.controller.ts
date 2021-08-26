import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateItemDto } from './dto/create.item-dto';
import { ItemService } from './item.service';

@Controller({
  path: 'inventory/items',
  version: '1',
})
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }
}
