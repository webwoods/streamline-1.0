import { StreamLineEntity } from './streamline.entity';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { CreditMemo } from './credit-memo.entity';
import { DebitMemo } from './debit-memo.entity';
import { OverdueMemo } from './overdue-memo.entity';

@Entity()
@ObjectType()
export class Invoice extends StreamLineEntity {
  @Column({ name: 'due_date', type: 'timestamp' })
  @Field()
  dueDate: Date;

  @Column({ type: 'float' })
  @Field(() => Float)
  amount: number;

  @Column({ name: 'is_paid', default: false })
  @Field(() => Boolean)
  isPaid: boolean;

  // shipment : one to one

  @OneToMany(() => CreditMemo, (creditMemo) => creditMemo.invoice, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @Field(() => [CreditMemo], { nullable: true })
  creditMemos: CreditMemo[];

  @OneToMany(() => DebitMemo, (debitMemo) => debitMemo.invoice, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @Field(() => [DebitMemo], { nullable: true })
  debitMemos: DebitMemo[];

  @OneToMany(() => OverdueMemo, (overdueMemo) => overdueMemo.invoice, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @Field(() => [OverdueMemo], { nullable: true })
  overdueMemos: OverdueMemo[];
}