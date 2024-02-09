import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
} from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Address } from './embedded/address.embedded';
import { Region } from './enum/region';

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

}
