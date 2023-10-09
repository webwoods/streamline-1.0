import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsBranchPluginService {
  getHello(): string {
    return 'Hello World!';
  }
}
