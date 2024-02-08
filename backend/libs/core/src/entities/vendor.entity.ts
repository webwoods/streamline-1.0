import { ObjectType, Field, Directive } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Purchase } from './purchase.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Vendor extends StreamLineEntity {

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  group?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  postalCode?: string;
}
