import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Room } from 'src/room/room.entity';
import { Interview } from 'src/interview/interview.entity';
import { User } from 'src/user/user.entity';

@Entity()
@ObjectType()
export class Student {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  studentId: string;

  @Column()
  @Field()
  studentEmail: string;

  @Column()
  @Field()
  studentName: string;

  @ManyToMany(() => Room, (room) => room.id, { nullable: true })
  @Field(() => Room, { nullable: true })
  interestedRooms?: [Room];

  @OneToMany(() => Interview, (interview) => interview.id)
  @Field((type) => Interview, { nullable: true })
  interviews?: [Interview];

  @Column({ name: 'userId' })
  @Field(() => ID)
  userId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  @Field(() => User)
  user: User;
}
