import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Branch } from './branch.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  code: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne((type) => Branch, (branch) => branch.id)
  branch: Branch;
}
