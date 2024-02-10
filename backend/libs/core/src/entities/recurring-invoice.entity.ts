import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity()
@ObjectType()
export class RecurringInvoice extends Invoice {

  // shipment : one to one
}