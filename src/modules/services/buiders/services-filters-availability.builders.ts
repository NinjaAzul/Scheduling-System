import { Prisma } from '@prisma/client';

import { PrismaBuilder } from 'src/@shared/builders';
import { generateRangeDate } from 'src/@shared/helpers';

export class ServicesFilterAvailabilityBuilder extends PrismaBuilder<
  Prisma.AppointmentWhereInput,
  Prisma.AppointmentOrderByWithRelationInput
> {
  private constructor(whereInput: Prisma.AppointmentWhereInput = {}) {
    super(whereInput);
  }

  static fromDto() {
    return new ServicesFilterAvailabilityBuilder({});
  }

  addServiceId(serviceId: number) {
    this.addWhereInput({
      serviceId,
    });

    return this;
  }

  addRangeDate(fromDate: Date, toDate: Date) {
    const { initialDate, finalDate } = generateRangeDate(fromDate, toDate);

    this.addWhereInput({
      scheduledAt: {
        gte: initialDate,
        lte: finalDate,
      },
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
