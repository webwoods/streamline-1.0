import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  division?: string;

  @OneToMany(() => User, (entity: User) => entity.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  users?: User[];
}
