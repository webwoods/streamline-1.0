import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from './request.entity';

@Entity()
@ObjectType()
export class File {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  // @OneToMany(() => Request, (entity: Request) => entity.id, {
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  //   nullable: true,
  // })
  // requests?: Request[];

  @Column()
  @Field({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
