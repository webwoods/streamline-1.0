import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from 'src/files/file.entity';
import { User } from 'src/users/user.entity';

@Entity()
@ObjectType()
export class Properties {


  @Field({ nullable: true })
  id?: string;


}


