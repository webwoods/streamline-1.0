import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Interview } from './interview.entity';
import { InterviewService } from './interview.service';
import { UpdateInterviewInput } from './dto/update.interview';
import { CreateInterviewInput } from './dto/create.interview';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(private readonly interviewService: InterviewService) {}

  @Query(() => [Interview], { name: 'interviews' })
  async findAllInterviews(): Promise<Interview[]> {
    return this.interviewService.findAllInterviews();
  }

  @Query(() => Interview, { name: 'interview' })
  async findInterviewById(@Args('id', { type: () => ID }) id: string): Promise<Interview> {
    return this.interviewService.findInterviewById(id);
  }

  @Mutation(() => Interview, { name: 'createInterview' })
  async createInterview(@Args('input') input: CreateInterviewInput): Promise<Interview> {
    return this.interviewService.createInterview(input);
  }

  @Mutation(() => Interview, { name: 'updateInterview' })
  async updateInterview(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateInterviewInput,
  ): Promise<Interview> {
    return this.interviewService.updateInterview(id, input);
  }

  @Mutation(() => Interview, { name: 'deleteInterview' })
  async deleteInterview(@Args('id', { type: () => ID }) id: string): Promise<Interview> {
    return this.interviewService.deleteInterview(id);
  }
}
