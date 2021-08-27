import { Column, PrimaryColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
  SELECT p.*, it.price, it.quantity, it.branch_id FROM product p 
  LEFT OUTER JOIN item it ON p.id = it.product_id;`,
})
export class ProductView {
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

  @Column({ type: 'float' })
  quantity: number;

  @Column()
  branchId: number;
}
