import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateInterviewInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  interviewDate?: Date;

  @Field({ nullable: true })
  interviewTime?: string;

  @Field(() => ID, { nullable: true })
  roomId?: string;

  @Field(() => ID, { nullable: true })
  studentId?: string;

  @Field({ nullable: true })
  status?: string;
}
