import { StreamLineEntity } from '@libs/core/entities/streamline.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Request } from '../requests/request.entity';

@Entity()
@ObjectType()
export class File extends StreamLineEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @OneToMany(() => Request, (request) => request.file)
  requests?: Request[];
}
