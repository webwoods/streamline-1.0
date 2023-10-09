import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcurementPluginService {
  getHello(): string {
    return 'Hello World!';
  }
}
