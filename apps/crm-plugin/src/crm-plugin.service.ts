import { Injectable } from '@nestjs/common';

@Injectable()
export class CrmPluginService {
  getHello(): string {
    return 'Hello World!';
  }
}
