import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
  DeleteDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class StreamLineEntity {
  constructor() {
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field({ nullable: true })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  @Field({ nullable: true })
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  @Field({ nullable: true })
  deletedAt: Date;

  // @Column()
  // @Field()
  // name: string;

  // @Column()
  // @Field()
  // slug: string;

  // @BeforeInsert()
  // generateSlug() {
  //   if (this.name) {
  //     this.slug = this.name
  //       .toLowerCase()
  //       .replace(/[^a-z0-9]+/g, '-')
  //       .replace(/(^-|-$)+/g, '');
  //   }
  // }
}
