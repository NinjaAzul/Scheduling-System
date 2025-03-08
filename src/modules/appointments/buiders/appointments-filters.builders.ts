import { Prisma } from '@prisma/client';

import { PrismaBuilder } from 'src/@shared/builders';

import { FilterAppointmentsDto } from '../dto/requests';
import { LoggedUser } from '@/@shared/@types';
import { RoleEnum } from '@/@shared/enums';
import { generateRangeDate } from '@/@shared/helpers';

export class AppointmentsFilterBuilder extends PrismaBuilder<
  Prisma.AppointmentWhereInput,
  Prisma.AppointmentOrderByWithRelationInput
> {
  private constructor(whereInput: Prisma.AppointmentWhereInput = {}) {
    super(whereInput);
  }

  static fromDto(filters: FilterAppointmentsDto,) {
    return new AppointmentsFilterBuilder({
      serviceId: filters.serviceId,
    });
  }

  addUserId(userId: number, logger: LoggedUser) {
    const isAdmin = logger.role.id === RoleEnum.ADMINISTRATOR;



    if (isAdmin) {
      if (userId) {
        this.addWhereInput({
          userId: userId,
        });
      }

      return this;
    }

    this.addWhereInput({
      userId: logger.id,
    });

    return this;
  }

  addRangeDate(fromDate: Date, toDate: Date) {
    const { initialDate, finalDate } = generateRangeDate(fromDate, toDate);

    this.addWhereInput({
      createdAt: {
        gte: initialDate,
        lte: finalDate,
      },
    });

    return this;
  }

  addSearch(search: string) {
    this.addWhereInput({
      OR: [{ service: { name: { contains: search } } }, { user: { name: { contains: search } } }],
    });

    return this;
  }

  protected addWhereInput(input: Prisma.AppointmentWhereInput) {
    this.where = {
      ...this.where,
      ...input,
    };
  }
}
