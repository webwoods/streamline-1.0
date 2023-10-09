import { Injectable } from '@nestjs/common';

@Injectable()
export class TransportPluginService {
  getHello(): string {
    return 'Hello World!';
  }
}
