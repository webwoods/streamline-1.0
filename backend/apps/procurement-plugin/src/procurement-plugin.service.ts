import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcurementPluginService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }
}
