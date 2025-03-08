import { Prisma } from '@prisma/client';

import { PrismaBuilder } from 'src/@shared/builders';
import { generateRangeDate } from 'src/@shared/helpers';

import { FilterServicesDto } from '../dto';

export class ServicesFilterBuilder extends PrismaBuilder<
  Prisma.ServiceWhereInput,
  Prisma.ServiceOrderByWithRelationInput
> {
  private constructor(whereInput: Prisma.ServiceWhereInput = {}) {
    super(whereInput);
  }

  static fromDto(filters: FilterServicesDto) {
    return new ServicesFilterBuilder({
      name: filters.search,
      id: filters.serviceId,
    });
  }

  addRangeDate(fromDate: string, toDate: string) {
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
      OR: [{ name: { contains: search } }],
    });

    return this;
  }

  protected addWhereInput(input: Prisma.ServiceWhereInput) {
    this.where = {
      ...this.where,
      ...input,
    };
  }
}
