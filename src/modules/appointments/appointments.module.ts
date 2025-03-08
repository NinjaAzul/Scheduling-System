import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';

import { AppointmentsRepository } from './appointments.repository';
import { PrismaClientModule } from 'src/infrastructure';
import { UsersModule } from '../users';
import { ServicesModule } from '../services';

@Module({
  imports: [PrismaClientModule, UsersModule, ServicesModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository],
  exports: [AppointmentsService, AppointmentsRepository],
})
export class AppointmentsModule {}
