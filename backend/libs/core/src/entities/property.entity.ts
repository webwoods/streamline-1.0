import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { StoreItem } from './storeItem.entity';

@Entity()
@ObjectType()
export class Property extends StreamLineEntity {
  @Column()
  @Field()
  key: string;

  @Column()
  @Field()
  value: string;

  @Column()
  @Field()
  type: string;

  @ManyToMany(() => StoreItem, (storeItem) => storeItem.properties, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @Field(() => [StoreItem], { nullable: true })
  storeItems?: StoreItem[];
}
