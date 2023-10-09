import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthPluginService {
  getHello(): string {
    return 'Hello World! This is the Auth Plugin';
  }
}
