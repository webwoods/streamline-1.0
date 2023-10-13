import { StreamLineEntity } from '@libs/core/entities/streamline.entity';
import { RequestItem } from '../requestItem/requestItem.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
@Entity()
@ObjectType()
export class Properties extends StreamLineEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ name: 'value', nullable: true })
  @Field({ nullable: true })
  value: string;

  @Column({ name: 'type', nullable: true })
  @Field({ nullable: true })
  type: string;

  @ManyToMany(() => RequestItem, (requestItem) => requestItem.properties)
  requestItems: RequestItem[];
}
