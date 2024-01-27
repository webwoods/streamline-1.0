import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Role } from './role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { StreamLineEntity } from './streamline.entity';
import { VerificationCode } from './verification-codes.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Purchase extends StreamLineEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  purchasingOrganization?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  currency?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentTerms?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  purchasingGroup: string;
}
