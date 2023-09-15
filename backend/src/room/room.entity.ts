import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Stall } from 'src/stall/stall.entity';
import { Student } from 'src/student/student.entity';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  roomNumber: string;

  @OneToOne(() => Stall, (stall) => stall.room)
  stall: Stall;

  @Column()
  @Field()
  roomStatus: string;

  @ManyToMany(() => Student, (student) => student.id, { nullable: true })
  @Field(() => Student, { nullable: true })
  interestedStudents?: [Student];

  @Column()
  @Field({ nullable: true })
  currentStudent?: string;
}
