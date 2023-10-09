import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPluginService {
  getHello(): string {
    return 'Hello World! This is the User Plugin';
  }
}
