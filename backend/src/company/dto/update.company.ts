import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  companyName?: string;

  // You can add other fields as needed
}
