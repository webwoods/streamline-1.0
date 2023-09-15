import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoomInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  roomNumber?: string;

  @Field(() => ID, { nullable: true })
  stallId?: string;

  @Field({ nullable: true })
  roomStatus?: string;

  @Field(() => [ID], { nullable: true })
  interestedStudentIds?: string[];

  @Field({ nullable: true })
  currentStudent?: string;
}
