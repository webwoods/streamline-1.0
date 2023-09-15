import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateStallInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  stallNumber?: string;

  @Field(() => ID, { nullable: true })
  companyId?: string;

  @Field(() => ID, { nullable: true })
  roomId?: string;

  @Field({ nullable: true })
  floorPlanLocation?: string;
}
