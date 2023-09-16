import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RequestDocument } from './requestDocument.entity';

@Entity()
@ObjectType()
export class Request {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  requestedDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  // @Column()
  // @Field()
  // requestedBy: User;

  // eg: dorector, labstore, procurement status
  @Column()
  @Field()
  status: string[];

  // document
  // @Column()
  // @Field()
  // document: RequestDocument;

  // tax
}
