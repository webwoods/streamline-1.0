import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UserRoles } from './enum/role';
import { StreamLineEntity } from '../../../libs/core/src/entities/streamline.entity';

@Entity()
@ObjectType()
export class Role extends StreamLineEntity {
  @Column({ unique: true })
  @Field(type => UserRoles)
  name: UserRoles;

  @Column({ nullable: true })
  @Field({ nullable: true })
  division?: string;

  @OneToMany(type => User, user => user.role)
  users?: User[];
}
