import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UserRoles } from './enum/role';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class Role {
  constructor() {
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field((type) => UserRoles)
  name: UserRoles;

  @Column({ nullable: true })
  @Field({ nullable: true })
  division?: string;

  @OneToMany(type => User, user => user.role)
  users?: User[];
}
