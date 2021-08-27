import { Injectable } from '@nestjs/common';
import { Client, ClientProxy } from '@nestjs/microservices';
import { microserviceConfig } from 'src/config/microservice.config';
import { CreateItemDto } from './dto/create.item-dto';

@Injectable()
export class ItemService {
  @Client(microserviceConfig)
  private client: ClientProxy;

  createItem(createItemDto: CreateItemDto) {
    return this.client.send('inventory.item.create', createItemDto);
  }
}
