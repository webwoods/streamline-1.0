import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Invoice } from './invoice.entity';

// Used to correct errors in previously issued invoices.
// Represents a reduction in the amount owed by the customer.

@Entity()
@ObjectType()
export class OverdueMemo extends StreamLineEntity {

  @ManyToOne(() => Invoice, (invoice) => invoice.overdueMemos)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  invoice: Invoice;

  @Column({ name: 'invoice_name' })
  @Field()
  invoiceId: string;

  @Column({ name: 'late_fee', type: 'float' })
  @Field(() => Float)
  lateFee: number;
}