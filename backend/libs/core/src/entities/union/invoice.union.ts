import { createUnionType } from "@nestjs/graphql";
import { Invoice } from "../invoice.entity";
import { ProformaInvoice } from "../proforma-invoice.entity";
import { RecurringInvoice } from "../recurring-invoice.entity";
import { InvoicePage, ProformaInvoicePage, RecurringInvoicePage } from "../dto/invoicePage.dto";
import { CreateInvoiceInput, CreateProformaInvoiceInput, CreateRecurringInvoiceInput } from "../dto/create.invoice";
import { UpdateInvoiceInput, UpdateProformaInvoiceInput, UpdateRecurringInvoiceInput } from "../dto/update.invoice";
import { isNullableType } from "graphql";

export const InvoiceUnion = createUnionType({
    name: 'InvoiceUnion',
    types: () => [Invoice, ProformaInvoice, RecurringInvoice] as const,
    // resolveType(value) {
    //     if (value.validityPeriod) {
    //         return ProformaInvoice;
    //     }
    //     if (value.recurrencePattern) {
    //         return RecurringInvoice;
    //     }
    //     if (value !== null) {
    //         return Invoice;
    //     }
    //     return null;
    // },
});

export const InvoicePageUnion = createUnionType({
    name: 'InvoicePageUnion',
    types: () => [InvoicePage, ProformaInvoicePage, RecurringInvoicePage] as const,
});

export const CreateInvoiceInputUnion = createUnionType({
    name: 'CreateInvoiceInputUnion',
    types: () => [CreateInvoiceInput, CreateProformaInvoiceInput, CreateRecurringInvoiceInput] as const,
    // resolveType(value) {
    //     if (value === null) {
    //         return null; // Make sure to handle null explicitly
    //     }
    //     if (value.validityPeriod) {
    //         return CreateProformaInvoiceInput;
    //     }
    //     if (value.recurrencePattern) {
    //         return CreateRecurringInvoiceInput;
    //     }
    //     return CreateInvoiceInput;
    // },
});

export const UpdateInvoiceInputUnion = createUnionType({
    name: 'UpdateInvoiceInputUnion',
    types: () => [UpdateInvoiceInput, UpdateProformaInvoiceInput, UpdateRecurringInvoiceInput] as const,
    // resolveType(value) {
    //     if (value.validityPeriod) {
    //         return ProformaInvoice;
    //     }
    //     if (value.recurrencePattern) {
    //         return RecurringInvoice;
    //     }
    //     if (value !== null) {
    //         return Invoice;
    //     }
    //     return null;
    // },
});