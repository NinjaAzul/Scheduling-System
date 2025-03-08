import { Module } from '@nestjs/common';

import { PrismaClientModule } from 'src/infrastructure';

import { UsersModule } from 'src/modules/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [PrismaClientModule, UsersModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
