import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { StoreItem } from './store-item.entity';
import { PropertyNotification } from './property-notification.entity';

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


  @OneToMany(() => PropertyNotification, (entity: PropertyNotification) => entity.property)
  @Field(() => [PropertyNotification], { nullable: true })
  notifications: PropertyNotification[];
}
