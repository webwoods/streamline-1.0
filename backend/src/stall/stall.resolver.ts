import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Stall } from './stall.entity';
import { StallService } from './stall.service';
import { CreateStallInput } from './dto/create.stall';
import { UpdateStallInput } from './dto/update.stall';

@Resolver(() => Stall)
export class StallResolver {
  constructor(private readonly stallService: StallService) {}

  @Query(() => [Stall], { name: 'stalls' })
  async findAllStalls(): Promise<Stall[]> {
    return this.stallService.findAllStalls();
  }

  @Query(() => Stall, { name: 'stall' })
  async findStallById(@Args('id', { type: () => ID }) id: string): Promise<Stall> {
    return this.stallService.findStallById(id);
  }

  @Mutation(() => Stall, { name: 'createStall' })
  async createStall(@Args('input') input: CreateStallInput): Promise<Stall> {
    return this.stallService.createStall(input);
  }

  @Mutation(() => Stall, { name: 'updateStall' })
  async updateStall(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateStallInput,
  ): Promise<Stall> {
    return this.stallService.updateStall(id, input);
  }

  @Mutation(() => Stall, { name: 'deleteStall' })
  async deleteStall(@Args('id', { type: () => ID }) id: string): Promise<Stall> {
    return this.stallService.deleteStall(id);
  }
}
