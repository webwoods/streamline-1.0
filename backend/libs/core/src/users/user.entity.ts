import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Role } from '../roles/role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { StreamLineEntity } from '../entities/streamline.entity';
import { VerificationCode } from '../verification-codes/verification-codes.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class User extends StreamLineEntity {
  @Column()
  @Field()
  username?: string;

  @Column()
  @Field()
  email?: string;

  @Column()
  @Field({ nullable: true })
  password!: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @ManyToOne((type) => Role)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  @Field((type) => Role, { nullable: true })
  role?: Role;

  @Column({ nullable: true })
  roleId?: string;

  @Column({ type: 'boolean', default: false })
  @Field({ defaultValue: false })
  verified?: boolean;

  @OneToMany(
    (type) => VerificationCode,
    (verificationCode) => verificationCode.user,
    { cascade: true, nullable: true },
  )
  @Field((type) => [VerificationCode], { nullable: true })
  verificationCodes?: VerificationCode[];
}
