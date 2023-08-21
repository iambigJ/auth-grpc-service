import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Generated,
  Index,
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
  })
  @Generated('increment')
  payer_id: bigint;

  @ManyToOne(() => Plan, (plan) => plan.id)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Index(['mobile', 'email'], { unique: true })
  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
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
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'current_timestamp',
    name: 'updatedAt',
  })
  updatedAt: Date;
}
