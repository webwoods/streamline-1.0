import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Request } from './request.entity';
import { Property } from './property.entity';
import { StoreItem } from './store-item.entity';

@Entity()
@ObjectType()
export class RequestItem extends StreamLineEntity {
  @OneToOne(() => StoreItem, (entity: StoreItem) => entity.requestItem)
  @JoinColumn({ name: 'store_item_id', referencedColumnName: 'id' })
  @Field()
  storeItem: StoreItem;

  @Column({ name: 'store_item_id', nullable: true })
  storeItemId: string;

  @Column({ type: 'bigint', nullable: true })
  @Field({ nullable: true })
  qty: number;

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

  @Column({ name: 'request_id', nullable: true })
  requestId: string;
}
