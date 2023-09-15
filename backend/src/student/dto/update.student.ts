import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  studentId?: string;

  @Field({ nullable: true })
  studentEmail?: string;

  @Field({ nullable: true })
  studentName?: string;

  @Field(() => [ID], { nullable: true })
  interestedRoomIds?: string[];
}
