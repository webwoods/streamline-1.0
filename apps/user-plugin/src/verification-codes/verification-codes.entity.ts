import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { StreamLineEntity } from '@libs/core/entities/streamline.entity';

/**
 * implement a task scheduler to automatically remove
 * the verification record from the database after 1 min
 */

@Entity()
@ObjectType()
export class VerificationCode extends StreamLineEntity {
  constructor(user: User, code: string) {
    super();
    this.user = user;
    this.code = code;
  }

  @Column({ name: 'user_id' })
  @Field()
  userId: string;

  @ManyToOne(() => User, (user) => user.verificationCodes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  @Field()
  code: string;
}
