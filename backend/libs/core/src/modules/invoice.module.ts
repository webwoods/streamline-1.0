import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../entities/invoice.entity';
import { ProformaInvoice } from '../entities/proforma-invoice.entity';
import { RecurringInvoice } from '../entities/recurring-invoice.entity';
import { CreditMemo } from '../entities/credit-memo.entity';
import { DebitMemo } from '../entities/debit-memo.entity';
import { OverdueMemo } from '../entities/overdue-memo.entity';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceResolver } from '../resolvers/invoice.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Invoice,
        ProformaInvoice,
        RecurringInvoice,
        CreditMemo,
        DebitMemo,
        OverdueMemo,
    ]),
  ],
  providers: [InvoiceResolver, InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
