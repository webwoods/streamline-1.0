import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ItemProperty {
  key: string,
  value: string
}

@Entity()
@ObjectType()
export class RequestItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: string;

  // @Column()
  // @Field()
  // properties: ItemProperty[]
}
