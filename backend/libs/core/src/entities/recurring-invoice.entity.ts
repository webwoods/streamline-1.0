import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column, Entity, TableInheritance } from 'typeorm';
import { Invoice } from './invoice.entity';

@ChildEntity()
@ObjectType()
export class RecurringInvoice extends Invoice {

  @Column({ name: 'reccurence_pattern', nullable: true })
  @Field({ nullable: true })
  recurrencePattern: string;

}