import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceInput {
    @Field({ nullable: true })
    dueDate?: Date;

    @Field(() => Float, { nullable: true })
    amount?: number;

    @Field(() => Boolean, { nullable: true })
    isPaid?: boolean;

    @Field({ nullable: true })
    requestId?: String;

    @Field(() => String, { nullable: true })
    type?: string;
}

@InputType()
export class UpdateProformaInvoiceInput {
    @Field({ nullable: true })
    validityPeriod?: string;
}

@InputType()
export class UpdateRecurringInvoiceInput {
    @Field({ nullable: true })
    recurrencePattern?: string;
}