import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create.room';
import { UpdateRoomInput } from './dto/update.room';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [Room], { name: 'rooms' })
  async findAllRooms(): Promise<Room[]> {
    return this.roomService.findAllRooms();
  }

  @Query(() => Room, { name: 'room' })
  async findRoomById(@Args('id', { type: () => ID }) id: string): Promise<Room> {
    return this.roomService.findRoomById(id);
  }

  @Mutation(() => Room, { name: 'createRoom' })
  async createRoom(@Args('input') input: CreateRoomInput): Promise<Room> {
    return this.roomService.createRoom(input);
  }

  @Mutation(() => Room, { name: 'updateRoom' })
  async updateRoom(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRoomInput,
  ): Promise<Room> {
    return this.roomService.updateRoom(id, input);
  }

  @Mutation(() => Room, { name: 'deleteRoom' })
  async deleteRoom(@Args('id', { type: () => ID }) id: string): Promise<Room> {
    return this.roomService.deleteRoom(id);
  }
}
