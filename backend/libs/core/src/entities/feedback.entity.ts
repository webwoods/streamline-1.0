import { StreamLineEntity } from './streamline.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Feedback extends StreamLineEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  rating: number;

  @ManyToOne(() => User, (user) => user.feedbacks)
  @JoinColumn({ name: 'submitted_user_id', referencedColumnName: 'id' })
  @Field(() => User)
  submittedUser: User;

  @Column({ name: 'submitted_user_id', nullable: true })
  @Field({ nullable: true })
  submittedUserId: string;
}