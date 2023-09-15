import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateInterviewInput {
  @Field()
  interviewDate: Date;

  @Field()
  interviewTime: string;

  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  studentId: string;
}
