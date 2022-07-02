import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column() 
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  code: string;

  @Column()
  sku: string;

  @Column()
  description: string;
}
