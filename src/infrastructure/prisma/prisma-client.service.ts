import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  // constructor() {
  //   super({
  //     log: ['query', 'info', 'warn', 'error'],
  //   });
  // }

  async onModuleInit() {
    await this.$connect();
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    await new Promise<void>((resolve, reject) => {
      process.on('beforeExit', () => {
        app
          .close()
          .then(() => {
            resolve();
          })
          .catch((error: Error) => {
            console.error('Erro ao fechar o aplicativo:', error);
            reject(new Error(error.message));
          });
      });
    });
  }
}
