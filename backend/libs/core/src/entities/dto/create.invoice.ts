import { Field, Float, InputType } from '@nestjs/graphql';
import { isNullableType } from 'graphql';

@InputType()
export class CreateInvoiceInput {

    @Field()
    dueDate: Date;

    @Field(() => Float)
    amount: number;

    @Field(() => Boolean)
    isPaid: boolean;

    @Field()
    requestId: String;

    @Field(() => String, { nullable: true })
    type?: string;

}


@InputType()
export class CreateProformaInvoiceInput extends CreateInvoiceInput {
    @Field({ nullable: true })
    validityPeriod?: string;
}

@InputType()
export class CreateRecurringInvoiceInput extends CreateInvoiceInput {
    @Field({ nullable: true })
    recurrencePattern?: string;
}
