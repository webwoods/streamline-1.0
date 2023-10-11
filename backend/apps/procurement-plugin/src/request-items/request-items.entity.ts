import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from '@libs/core/entities/streamline.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Request } from '../requests/request.entity';

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
  quantity: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  price: number;

  @ManyToMany(() => Request, (request) => request.requestItems)
  @JoinTable({
    name: 'request_request_items',
    joinColumn: { name: 'request_item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'request_id', referencedColumnName: 'id' },
  })
  @Field(() => [Request])
  requests: Request[];
}
