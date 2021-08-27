import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  userId?: number;

  @Column({ type: 'json', nullable: true })
  args?: unknown;

  @Column({ nullable: true })
  result?: string;

  @CreateDateColumn()
  createdAt: Date;
}
