import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class File {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column()
  @Field({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
