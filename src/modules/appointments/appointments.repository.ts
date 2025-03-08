import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure';
import { Prisma } from '@prisma/client';
import { AppointmentsFilterBuilder } from './buiders';
@Injectable()
export class AppointmentsRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createAppointmentDto: Prisma.AppointmentCreateManyInput) {
    return this.prismaService.appointment.create({
      data: createAppointmentDto,
    });
  }

  async findAll(builder: AppointmentsFilterBuilder) {
    const { where, orderBy, pagination } = builder.build();


    const appointments = await this.prismaService.appointment.findMany({
      where,
      orderBy,
      skip: pagination.skip,
      take: pagination.take,
      select: {
        id: true,
        userId: true,
        scheduledAt: true,
        createdAt: true,
        updatedAt: true,
        service: {
          select: {
            id: true,
            name: true,
            price: true,

          }
        }
      },
    });

    return { appointments, pagination };
  }


  async count(builder: AppointmentsFilterBuilder) {
    const { where } = builder.build();

    return await this.prismaService.appointment.count({
      where,
    });
  }
}