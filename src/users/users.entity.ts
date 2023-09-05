import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Generated,
  AfterLoad,
} from 'typeorm';
import { Plan } from '../plans/plans.entity';
import { JoinColumn } from 'typeorm';

interface Profile {
  [key: string]: any;
}

@Entity({ name: 'Users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ unique: true })
  referralCode: string;

  @Column({
    type: 'bigint',
    unique: true,
    name: 'payer_id',
  })
  @Generated('increment')
  payerId: bigint;

  @ManyToOne(() => Plan, (plan) => plan.id)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column({
    name: 'plan_id',
  })
  planId: string;

  @Column({ nullable: true, unique: true })
  mobile: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column('jsonb', { nullable: false, default: {} })
  profile: Profile;

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
}
