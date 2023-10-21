import { User } from '../user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginSuccess {
  constructor(me: User, accessToken: string) {
    this.me = me;
    this.accessToken = accessToken;
  }

  @Field({ nullable: true })
  me: User;

  @Field({ nullable: true })
  accessToken: string;
}

@ObjectType()
export class RegisterNewUserSuccess {
  constructor(me: User, verificationToken: string) {
    this.me = me;
    this.verificationToken = verificationToken;
  }

  @Field({ nullable: true })
  me: User;

  @Field({ nullable: true })
  verificationToken: string;
}

@ObjectType()
export class VerificationSuccess {
  @Field()
  me: User;
}
