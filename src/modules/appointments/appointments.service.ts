import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/requests/create-appointment.dto';
import { AppointmentsRepository } from './appointments.repository';
import { UsersRepository } from '../users';
import { ServicesRepository, ServicesService } from '../services';
import { I18nService } from 'nestjs-i18n';
import { I18n } from '@/@shared/i18n';
import { Prisma, User, Role } from '@prisma/client';
import { generateRangeDate } from '@/@shared/helpers';
import { RoleEnum } from '@/@shared/enums';
import { LoggedUser } from '@/@shared/@types';
import { FilterAppointmentsDto } from './dto/requests';
import { AppointmentsFilterBuilder } from './buiders';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly servicesService: ServicesService,
    private readonly servicesRepository: ServicesRepository,
    private readonly i18n: I18nService,
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto, loggedUser: LoggedUser) {
    const { userId, serviceId, scheduledAt } = createAppointmentDto;

    const isAdmin = loggedUser.role.id === RoleEnum.ADMINISTRATOR;

    let user = undefined;

    if (isAdmin) {
      if (userId) {
        user = userId;
      } else {
        user = loggedUser.id;
      }
    } else {
      user = loggedUser.id;
    }



    const userExists = await this.usersRepository.findOne(user);


    if (!userExists) {
      throw new NotFoundException(
        this.i18n.translate(I18n.MODULES.USERS.USER_NOT_FOUND.KEY),
      );
    }

    const serviceExists = await this.servicesRepository.findById(serviceId);

    if (!serviceExists) {
      throw new NotFoundException(
        this.i18n.translate(I18n.MODULES.SERVICES.SERVICE_NOT_FOUND.KEY),
      );
    }


    const { initialDate, finalDate } = generateRangeDate(scheduledAt, scheduledAt);

    const scheduleAvailability = await this.servicesService.findAvailability(serviceId, {
      fromDate: initialDate,
      toDate: finalDate,
    });


    const isAvailable = await this.servicesService.checkAvailability(scheduleAvailability, scheduledAt);


    if (!isAvailable) {
      throw new BadRequestException(
        this.i18n.translate(I18n.MODULES.SERVICES.SERVICE_NOT_AVAILABLE.KEY),
      );
    }

    const input: Prisma.AppointmentCreateManyInput = {
      userId: userExists.id,
      serviceId: serviceId,
      scheduledAt: scheduledAt,
    };

    const appointment = await this.appointmentsRepository.create(input);

    return {
      id: appointment.id,
      message: this.i18n.translate(I18n.MODULES.APPOINTMENTS.APPOINTMENT_CREATED_SUCCESSFULLY.KEY),
    };
  }

  async findAll(filters: FilterAppointmentsDto, logger: LoggedUser) {
    const builder = AppointmentsFilterBuilder.fromDto(filters);

    builder.addUserId(filters.userId, logger);
    builder.addRangeDate(filters.fromDate, filters.toDate);
    builder.addSearch(filters.search);

    const total = await this.appointmentsRepository.count(builder);

    builder.addPagination(filters.page, filters.take, total);
    builder.addOrderBy({ createdAt: 'asc' });

    const { pagination, appointments } = await this.appointmentsRepository.findAll(builder);

    return {
      appointments,
      pagination,
    };
  }
}
