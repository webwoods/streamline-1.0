import { StreamLineEntity } from './streamline.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Request } from './request.entity';
import { FileNotification } from './file-notification.entity';

@Entity()
@ObjectType()
export class File extends StreamLineEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @OneToMany(() => Request, (request) => request.file)
  @Field(() => [Request])
  requests?: Request[];

  @OneToMany(() => FileNotification, (entity: FileNotification) => entity.file)
  @Field(() => [FileNotification], { nullable: true })
  notifications: FileNotification[];
}