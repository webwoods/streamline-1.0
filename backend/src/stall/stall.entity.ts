import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Room } from 'src/room/room.entity';
import { Company } from 'src/company/company.entity';

@Entity()
@ObjectType()
export class Stall {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  stallNumber: string;

  @ManyToOne(() => Company, (company) => company.stalls)
  @Field(() => Company)
  company: Company;

  @OneToOne(() => Room)
  @JoinColumn()
  room: Room;

  @Column()
  @Field({ nullable: true })
  floorPlanLocation?: string;
}
