import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure';
import { Prisma } from '@prisma/client';
import {
  ServicesFilterAvailabilityBuilder,
  ServicesFilterBuilder,
} from './buiders';

@Injectable()
export class ServicesRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createServiceDto: Prisma.ServiceCreateManyInput) {
    return await this.prismaService.service.create({
      data: createServiceDto,
    });
  }

  async findAll(builder: ServicesFilterBuilder) {
    const { where, orderBy, pagination } = builder.build();

    const services = await this.prismaService.service.findMany({
      where,
      orderBy,
      skip: pagination.skip,
      take: pagination.take,
    });

    return { services, pagination };
  }

  async findAvailability(builder: ServicesFilterAvailabilityBuilder) {
    const { where, orderBy, pagination } = builder.build();

    const appointments = await this.prismaService.appointment.findMany({
      where,
      orderBy,
      skip: pagination.skip,
      take: pagination.take,
    });

    return { appointments, pagination };
  }

  async countAvailability(builder: ServicesFilterAvailabilityBuilder) {
    const { where } = builder.build();

    return await this.prismaService.appointment.count({
      where,
    });
  }

  async count(builder: ServicesFilterBuilder) {
    const { where } = builder.build();

    return await this.prismaService.service.count({
      where,
    });
  }

  async findById(id: number) {
    return await this.prismaService.service.findUnique({
      where: { id },
    });
  }
}
