import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivityLog } from 'src/user-activity-log/user-activity-log.entity';
import { UserActivityLogService } from 'src/user-activity-log/user-activity-log.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, UserActivityLog])],
  controllers: [ProductController],
  providers: [ProductService, UserActivityLogService],
})
export class ProductModule {}
