import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Address } from './embedded/address.embedded';
import { Region } from './enum/region';
import { StoreItem } from './store-item.entity';
import { Request } from './request.entity';

@Entity()
@ObjectType()
export class Vendor extends StreamLineEntity {

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  email!: string;

  @Column()
  @Field()
  phone!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  group?: string;

  @Column(() => Address, {})
  @Field(() => Address)
  address?: Address;

  @Column({ name: 'region', type: 'text' })
  @Field(() => Region)
  region!: Region;

  @ManyToMany(() => StoreItem, (storeItem) => storeItem.vendors,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
  @JoinTable({
    name: 'vendor_store_items',
    joinColumn: { name: 'vendor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'store_item_id', referencedColumnName: 'id' }
  })
  @Field(() => [StoreItem], { nullable: true })
  storeItems: StoreItem[];

  @OneToMany(() => Request, (request) => request.vendor)
  @Field(() => [Request], { nullable: true })
  requests: Request[];
}
