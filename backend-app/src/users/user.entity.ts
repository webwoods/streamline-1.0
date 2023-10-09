import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from 'src/roles/role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { StreamLineEntity } from 'src/core/streamline.entity';

@Entity()
@ObjectType()
export class User extends StreamLineEntity {
  // constructor() {
  //   this.id = uuidv4();
  // }

  // @PrimaryGeneratedColumn('uuid')
  // @Field(() => ID)
  // id: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @ManyToOne((type) => Role)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  @Field((type) => Role, { nullable: true })
  role: Role;

  @Column({ nullable: true })
  roleId: string;
}
