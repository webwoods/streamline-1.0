import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Request } from './request.entity';
import { Property } from './property.entity';

@Entity()
@ObjectType()
export class RequestItem extends StreamLineEntity {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  sku: string;

  @Column({ type: 'bigint', nullable: true })
  @Field({ nullable: true })
  stock: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  unit: string;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  price: number;

  @ManyToMany(() => Request, (request) => request.requestItems, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'request_request_items',
    joinColumn: { name: 'request_item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'request_id', referencedColumnName: 'id' },
  })
  @Field(() => [Request], { nullable: true })
  requests: Request[];

  @ManyToMany(() => Property, (property) => property.requestItems, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'request_item_properties',
    joinColumn: { name: 'request_item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'property_id', referencedColumnName: 'id' },
  })
  @Field(() => [Property], { nullable: true })
  properties: Property[];
}
