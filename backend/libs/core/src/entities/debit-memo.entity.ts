import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Invoice } from './invoice.entity';

// Issued to request additional payment from the customer.
// Represents an increase in the amount owed.

@Entity()
@ObjectType()
export class DebitMemo extends StreamLineEntity {

  @ManyToOne(() => Invoice, (invoice) => invoice.debitMemos)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice: Invoice;

  @Column({ name: 'invoice_name' })
  @Field()
  invoiceId: string;

  @Column()
  @Field()
  reason: string;
}