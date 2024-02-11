import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { ProformaInvoice } from '../entities/proforma-invoice.entity';
import { RecurringInvoice } from '../entities/recurring-invoice.entity';
import { CreateInvoiceInput, CreateProformaInvoiceInput, CreateRecurringInvoiceInput } from '../entities/dto/create.invoice';
import { UpdateProformaInvoiceInput, UpdateRecurringInvoiceInput, UpdateInvoiceInput } from '../entities/dto/update.invoice';

function isCreateProformaInvoice(input: any): input is CreateProformaInvoiceInput {
  return input.validityPeriod !== undefined;
}

function isCreateRecurringInvoice(input: any): input is CreateRecurringInvoiceInput {
  return input.recurrencePattern !== undefined;
}

function isCreateInvoice(input: any): input is CreateInvoiceInput {
  return input !== undefined || input !== null;
}

function isUpdateProformaInvoice(input: any): input is UpdateProformaInvoiceInput {
  return input.validityPeriod !== undefined;
}

function isUpdateRecurringInvoice(input: any): input is UpdateRecurringInvoiceInput {
  return input.recurrencePattern !== undefined;
}

function isUpdateInvoice(input: any): input is UpdateInvoiceInput {
  return input !== undefined || input !== null;
}

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @InjectRepository(ProformaInvoice)
    private readonly proformaRepository: Repository<ProformaInvoice>,

    @InjectRepository(RecurringInvoice)
    private readonly recurringRepository: Repository<RecurringInvoice>,
  ) { }

  async findAllInvoices(skip: number, take: number, type?: string): Promise<Invoice[] | ProformaInvoice[] | RecurringInvoice[]> {
    const data = await this.invoiceRepository.find({
      skip,
      take,
      where: {
        type
      },
      order: {
        createdAt: 'DESC'
      },
      relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
    });
    return data;
  }

  async findInvoiceById(id: string): Promise<Invoice | ProformaInvoice | RecurringInvoice | null> {
    const found =  await this.invoiceRepository.findOne({
      relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
      where: { id },
    });
    console.log(found);
    return found;
  }


  async createInvoice(input: Partial<Invoice> | Partial<ProformaInvoice> | Partial<RecurringInvoice>): Promise<Invoice | ProformaInvoice | RecurringInvoice | null> {
    try {
      let createdInvoice: Invoice | ProformaInvoice | RecurringInvoice | null = null;

      if (isCreateRecurringInvoice(input)) {
        const recurringInvoice = this.recurringRepository.create(input);
        createdInvoice = await this.recurringRepository.save(recurringInvoice);
      } else if (isCreateProformaInvoice(input)) {
        const proformaInvoice = this.proformaRepository.create(input);
        createdInvoice = await this.proformaRepository.save(proformaInvoice);
      } else if (isCreateInvoice(input)) {
        const invoice = this.invoiceRepository.create(input);
        createdInvoice = await this.invoiceRepository.save(invoice);
      }

      if (createdInvoice) {
        const found = await this.invoiceRepository.findOne({
          relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
          where: { id: createdInvoice.id },
        });
        return found;
      }

      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateInvoice(id: string, input: Partial<Invoice> | Partial<ProformaInvoice> | Partial<RecurringInvoice>): Promise<Invoice | ProformaInvoice | RecurringInvoice | null> {

    try {
      let invoice: Invoice | ProformaInvoice | RecurringInvoice | null = null;
      let updatedInvoice: Invoice | ProformaInvoice | RecurringInvoice | null = null;

      if (isUpdateRecurringInvoice(input)) {

        invoice = await this.recurringRepository.findOne({
          relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
          where: { id },
        });

        // If the invoice doesn't exist, throw NotFoundException
        if (!invoice) {
          throw new NotFoundException(`Recurring Invoice with id ${id} not found`);
        }

        Object.assign(invoice, input);
        updatedInvoice = await this.recurringRepository.save(invoice);
        
        return updatedInvoice;

      } else if (isUpdateProformaInvoice(input)) {

        invoice = await this.proformaRepository.findOne({
          relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
          where: { id },
        });

        // If the invoice doesn't exist, throw NotFoundException
        if (!invoice) {
          throw new NotFoundException(`Proforma Invoice with id ${id} not found`);
        }

        Object.assign(invoice, input);
        updatedInvoice = await this.proformaRepository.save(invoice);

        return updatedInvoice;

      } else if (isUpdateInvoice(input)) {

        invoice = await this.invoiceRepository.findOne({
          relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
          where: { id },
        });

        // If the invoice doesn't exist, throw NotFoundException
        if (!invoice) {
          throw new NotFoundException(`Invoice with id ${id} not found`);
        }

        Object.assign(invoice, input);
        updatedInvoice = await this.invoiceRepository.save(invoice);

        return updatedInvoice;
      }
    } catch (error) {
      throw new Error(`Error updating invoice: ${error}`);
    }
  }

  async deleteInvoice(id: string): Promise<Invoice | ProformaInvoice | RecurringInvoice | null> {
    const invoice = await this.invoiceRepository.findOne({
      relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
      where: { id },
    });
    await this.invoiceRepository.delete(id);
    return invoice;
  }
}
