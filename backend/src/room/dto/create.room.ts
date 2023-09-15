import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field()
  roomNumber: string;

  @Field(() => ID)
  stallId: string; // Assuming you will provide the Stall ID for the room

  @Field()
  roomStatus: string;

  @Field(() => [ID], { nullable: true })
  interestedStudentIds?: string[]; // Assuming you will provide an array of Student IDs

  @Field({ nullable: true })
  currentStudent?: string;
}
