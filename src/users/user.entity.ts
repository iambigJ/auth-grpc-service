import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Plan } from '../plans/plans.entity';
import { JoinColumn } from 'typeorm/browser';

interface Profile {
  [key: string]: any;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean' })
  emailVerified: boolean;

  @Column()
  referralCode: string;

  @Column({
    type: 'bigint',
  })
  payer_id: bigint;

  @ManyToOne(() => Plan, (plan) => plan.id)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column()
  mobile: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column('jsonb', { nullable: false, default: {} })
  profile: Profile;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
