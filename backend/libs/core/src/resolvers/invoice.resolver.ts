import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { CreateInvoiceInputUnion, InvoicePageUnion, InvoiceUnion, UpdateInvoiceInputUnion } from '../entities/union/invoice.union';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../entities/invoice.entity';
import { ProformaInvoice } from '../entities/proforma-invoice.entity';
import { RecurringInvoice } from '../entities/recurring-invoice.entity';
import { InvoicePage, ProformaInvoicePage, RecurringInvoicePage } from '../entities/dto/invoicePage.dto';
import { CreateInvoiceInput, CreateProformaInvoiceInput, CreateRecurringInvoiceInput } from '../entities/dto/create.invoice';
import { UpdateInvoiceInput, UpdateProformaInvoiceInput, UpdateRecurringInvoiceInput } from '../entities/dto/update.invoice';

@Resolver()
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Query(() => InvoiceUnion, { name: 'invoice' })
  async getInvoiceById(@Args('id') id: string): Promise<Invoice | ProformaInvoice | RecurringInvoice> {
    try {
      const invoice = this.invoiceService.findInvoiceById(id);
      if (!invoice) {
        throw new Error(`Invoice with ID ${id} not found`);
      }
      return invoice;
    } catch (error: any) {
      throw new Error(`Error fetching invoice: ${error.message}`);
    }
  }

  @Query(() => InvoicePageUnion, { name: 'invoices' })
  async getInvoices(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<InvoicePage | ProformaInvoicePage | RecurringInvoicePage> {
    try {
      const skip = (page - 1) * pageSize;
      const invoices = await this.invoiceService.findAllInvoices(skip, pageSize);
      const invoicesPage: InvoicePage | ProformaInvoicePage | RecurringInvoicePage = { data: invoices, totalItems: invoices.length };
      return invoicesPage;
    } catch (error: any) {
      throw new Error(`Error fetching invoices: ${error.message}`);
    }
  }

  @Mutation(() => InvoiceUnion, { name: 'createInvoice' })
  async createInvoice(
    @Args('invoiceInput', { type: () => CreateInvoiceInput, nullable: true }) invoiceInput?: CreateInvoiceInput,
    @Args('proformaInvoiceInput', { type: () => CreateProformaInvoiceInput, nullable: true }) proformaInvoiceInput?: CreateProformaInvoiceInput,
    @Args('reccuringInvoiceInput', { type: () => CreateRecurringInvoiceInput, nullable: true }) recurringInvoiceInput?: CreateRecurringInvoiceInput,
  ): Promise<Invoice | ProformaInvoice | RecurringInvoice> {
    try {
      if (invoiceInput) {
        return await this.invoiceService.createInvoice(invoiceInput);
      }
      if (proformaInvoiceInput) {
        return await this.invoiceService.createInvoice(proformaInvoiceInput);
      }
      if (recurringInvoiceInput) {
        return await this.invoiceService.createInvoice(recurringInvoiceInput);
      }
    } catch (error: any) {
      throw new Error(`Error creating invoice: ${error.message}`);
    }
  }

  @Mutation(() => InvoiceUnion, { name: 'updateInvoice' })
  async updateInvoice(
    @Args('id') id: string,
    @Args('invoiceInput', { type: () => UpdateInvoiceInput, nullable: true }) invoiceInput?: CreateInvoiceInput,
    @Args('proformaInvoiceInput', { type: () => UpdateProformaInvoiceInput, nullable: true }) proformaInvoiceInput?: CreateProformaInvoiceInput,
    @Args('reccuringInvoiceInput', { type: () => UpdateRecurringInvoiceInput, nullable: true }) recurringInvoiceInput?: CreateRecurringInvoiceInput,
  ): Promise<Invoice | ProformaInvoice | RecurringInvoice | null> {
    try {
      let updated: any = null;
      if (invoiceInput) {
        updated = await this.invoiceService.updateInvoice(id, invoiceInput);
      }
      if (proformaInvoiceInput) {
        updated = await this.invoiceService.updateInvoice(id, proformaInvoiceInput);
      }
      if (recurringInvoiceInput) {
        updated = await this.invoiceService.updateInvoice(id, recurringInvoiceInput);
      }
      return updated;
    } catch (error: any) {
      throw new Error(`Error updating invoice: ${error.message}`);
    }
  }

  @Mutation(() => InvoiceUnion, { name: 'deleteInvoice' })
  async deleteInvoice(@Args('id') id: string): Promise<Invoice | ProformaInvoice | RecurringInvoice> {
    try {
      return await this.invoiceService.deleteInvoice(id);
    } catch (error: any) {
      throw new Error(`Error deleting invoice: ${error.message}`);
    }
  }

  /**
   * required by graphql federation
   */
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.invoiceService.findInvoiceById(reference.id);
  }
}
