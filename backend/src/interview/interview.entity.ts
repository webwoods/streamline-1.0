import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { Room } from 'src/room/room.entity';

@Entity()
@ObjectType()
export class Interview {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  interviewDate: Date;

  @Column()
  @Field()
  interviewTime: string;

  @OneToOne(() => Room)
  @Field(() => Room)
  room: Room;

  @ManyToOne(() => Student)
  @Field(() => Student)
  student: Student;

  @Column()
  @Field({ nullable: true })
  status?: string;
}
