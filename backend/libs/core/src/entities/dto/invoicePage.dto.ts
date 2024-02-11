import { Invoice } from '../invoice.entity';
import { ProformaInvoice } from '../proforma-invoice.entity';
import { RecurringInvoice } from '../recurring-invoice.entity';
import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvoicePage extends PaginateResult(Invoice) {}

@ObjectType()
export class ProformaInvoicePage extends PaginateResult(ProformaInvoice) {}

@ObjectType()
export class RecurringInvoicePage extends PaginateResult(RecurringInvoice) {}
