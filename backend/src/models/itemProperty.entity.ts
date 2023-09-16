import { Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ItemProperty {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  key: string;

  @Column()
  @Field({ nullable : true })
  value: string;
}
