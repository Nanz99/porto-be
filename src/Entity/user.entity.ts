import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Role } from './role.entity';

export enum RoleId {
  ADMIN = 1,
  USER = 2,
  STORE = 3,
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  phoneNumber: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;

  @Column({ type: 'enum', default: RoleId.USER })
  roleId: number;

  @Column({nullable: true})
  addressId: number;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn()
  address: Address;
}
