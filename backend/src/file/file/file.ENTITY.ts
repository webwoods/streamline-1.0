
/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from 'uuidv
import { v4 as uuidv4 } from 'uuid';
import { request } from 'http';
import { Request } from 'src/requests/request.entity';
import { RequestModule } from 'src/requests/request.module';

@Entity()
@ObjectType()
export class File {
  constructor() {
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ name: 'name', nullable: true })
  @Field({ nullable: true })
  name: string;

@OneToMany(()=>Request, (entity: Request) => entity.file )
@Field(()=>[Request], {nullable: true })
requests: Request[];


}
