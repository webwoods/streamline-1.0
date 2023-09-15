import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Stall } from 'src/stall/stall.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  companyName: string;

  @OneToMany(() => Stall, (stall) => stall.company, { nullable: true })
  @Field(() => [Stall], { nullable: true })
  stalls: Stall[];

  @Column({ name: 'userId' })
  @Field(() => ID)
  userId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  @Field(() => User)
  user: User;
}
