import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/healthz')
  getHealth(): string {
    console.warn('Health check');
    return 'OK';
  }

  @Get('/readyz')
  getReady(): string {
    console.warn('Ready check');
    return 'OK';
  }
}
