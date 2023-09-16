import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  division?: string;
}
