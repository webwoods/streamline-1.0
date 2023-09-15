import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async createRoom(input: Partial<Room>): Promise<Room> {
    const room = this.roomRepository.create(input);
    return await this.roomRepository.save(room);
  }

  async findAllRooms(): Promise<Room[]> {
    return await this.roomRepository.find();
  }

  async findRoomById(id: string): Promise<Room> {
    return await this.roomRepository.findOne({ where: { id } });
  }

  async updateRoom(id: string, input: Partial<Room>): Promise<Room> {
    await this.roomRepository.update(id, input);
    return await this.roomRepository.findOne({ where: { id } });
  }

  async deleteRoom(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    await this.roomRepository.delete(id);
    return room;
  }
}
