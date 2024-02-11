import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { ProformaInvoice } from '../entities/proforma-invoice.entity';
import { RecurringInvoice } from '../entities/recurring-invoice.entity';
import { CreateProformaInvoiceInput, CreateRecurringInvoiceInput } from '../entities/dto/create.invoice';

function isCreateProformaInvoice(input: any): input is CreateProformaInvoiceInput {
  return input.validityPeriod !== undefined;
}

function isCreateRecurringInvoice(input: any): input is CreateRecurringInvoiceInput {
  return input.recurrencePattern !== undefined;
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
    return await this.invoiceRepository.findOne({
      relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
      where: { id },
    });
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
      } else if (input !== null) {
        const invoice = this.invoiceRepository.create(input);
        createdInvoice = await this.invoiceRepository.save(invoice);
      }

      if (createdInvoice) {
        return await this.invoiceRepository.findOne({
          relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
          where: { id: createdInvoice.id },
        });
      }

      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateInvoice(id: string, input: Partial<Invoice> | Partial<ProformaInvoice> | Partial<RecurringInvoice>): Promise<Invoice | ProformaInvoice | RecurringInvoice | null> {
    const invoice = await this.invoiceRepository.findOne({
      relations: { request: true, creditMemos: true, debitMemos: true, overdueMemos: true },
      where: { id },
    });

    // If the invoice doesn't exist, throw NotFoundException
    if (!invoice) {
      throw new NotFoundException(`Invoice with id ${id} not found`);
    }

    Object.assign(invoice, input);

    await this.invoiceRepository.save(invoice);
    return await this.findInvoiceById(id);
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
