import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;
}
