import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';

@ObjectType()
export class LoginSuccess {
  constructor(me: User, accessToken: string) {
    this.me = me;
    this.accessToken = accessToken;
  }
  
  @Field()
  me: User;

  @Field()
  accessToken: string;
}

@ObjectType()
export class RegisterNewUserSuccess {
  constructor(me: User, verificationToken: string) {
    this.me = me;
    this.verificationToken = verificationToken;
  }

  @Field()
  me: User;

  @Field()
  verificationToken: string;
}

@ObjectType()
export class VerificationSuccess {
  @Field()
  me: User;
}
