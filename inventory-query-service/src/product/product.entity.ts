import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity()
@Index(['branchId', 'name', 'color'])
export class Product {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  code: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  branchId: number;
}
