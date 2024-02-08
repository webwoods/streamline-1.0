import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { UserRoles } from './enum/role';
import { StreamLineEntity } from './streamline.entity';
import { RequestNotification } from './request-notification.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Role extends StreamLineEntity {
  @Column({ type: 'text', unique: true })
  @Field(type => UserRoles)
  name!: UserRoles;

  @Column({ nullable: true })
  @Field({ nullable: true })
  division?: string;

  @OneToMany(type => User, user => user.role)
  users?: User[];

  @OneToMany(() => RequestNotification, (entity: RequestNotification) => entity.request)
  @Field(() => [RequestNotification], { nullable: true })
  notifications: RequestNotification[];
}
