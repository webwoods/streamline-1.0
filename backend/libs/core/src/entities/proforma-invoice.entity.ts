import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column, Entity, TableInheritance } from 'typeorm';
import { Invoice } from './invoice.entity';

@ChildEntity()
@ObjectType()
export class ProformaInvoice extends Invoice {

  @Column({ name: 'validity_period', nullable: true })
  @Field({ nullable: true })
  validityPeriod?: string;

}