import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Users } from '../users/users.entity';

interface PlanData {
  [key: string]: any;
}

@Entity({ name: 'Plan' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('jsonb', { nullable: false, default: {} })
  data: PlanData;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Users, (user) => user.plan)
  user: Users[];
}
