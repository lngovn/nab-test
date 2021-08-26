import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { OrderedItem } from './ordered-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @OneToMany(() => OrderedItem, (orderedItem) => orderedItem.order)
  orderedItems: OrderedItem[];
}
