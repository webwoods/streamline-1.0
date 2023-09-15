import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateStallInput {
  @Field()
  stallNumber: string;

  @Field(() => ID)
  companyId: string; // Assuming you will provide the Company ID for the stall

  @Field(() => ID)
  roomId: string; // Assuming you will provide the Room ID for the stall

  @Field({ nullable: true })
  floorPlanLocation?: string;
}
