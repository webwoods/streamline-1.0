import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestInput {
    
  @Field({ nullable: true })
  fileId?: string;

  @Field({ nullable: true })
  requestType?: string;

  @Field({ nullable: true })
  requestedUserId?: string;

  @Field({ nullable: true })
  requestedDate?: Date;

  @Field({ nullable: true })
  description?: string;
}
