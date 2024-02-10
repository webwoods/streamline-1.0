import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Invoice } from './invoice.entity';

// Used to correct errors in previously issued invoices.
// Represents a reduction in the amount owed by the customer.

@Entity()
@ObjectType()
export class CreditMemo extends StreamLineEntity {

  @ManyToOne(() => Invoice, (invoice) => invoice.creditMemos)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice: Invoice;

  @Column({ name: 'invoice_name' })
  @Field()
  invoiceId: string;

  @Column()
  @Field()
  reason: string;
}