import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, DeleteDateColumn, AfterLoad
} from "typeorm";
import { Users } from '../users/users.entity';

export interface PlanData {
  [key: string]: any;
}

@Entity({ name: 'Plans' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('jsonb', { nullable: false, default: {} })
  data: PlanData;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'current_timestamp',
    name: 'createdAt',
  })
  createdAt: Date | string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'current_timestamp',
    name: 'updatedAt',
  })
  updatedAt: Date | string;

  @DeleteDateColumn()
  public deletedAt: Date;
  @AfterLoad()
  afterLoad() {
    if (
      typeof this.createdAt !== 'string' &&
      typeof this.updatedAt !== 'string'
    ) {
      this.createdAt = this.createdAt.toISOString();
      this.updatedAt = this.updatedAt?.toISOString();
    }
  }

  @OneToMany(() => Users, (user) => user.plan)
  user: Users[];
}
