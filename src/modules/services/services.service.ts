import { Injectable } from '@nestjs/common';
import { CreateServiceDto, FilterServicesAvailabilityDto, FilterServicesDto } from './dto';
import { ServicesRepository } from './services.repository';
import { Prisma } from '@prisma/client';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18n } from 'src/@shared/i18n';
import { convertToISOString, generateAllDates } from 'src/@shared/helpers';
import { ServicesFilterAvailabilityBuilder, ServicesFilterBuilder } from './buiders';
import { endOfDay, isAfter, isBefore, isSameDay, isEqual } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository, private readonly i18n: I18nService) { }

  async create(createServiceDto: CreateServiceDto) {
    const { name, duration, price, startHour, endHour } = createServiceDto;

    const input: Prisma.ServiceCreateManyInput = {
      name,
      duration,
      price,
      startTime: startHour,
      endTime: endHour,
    };

    const { id } = await this.servicesRepository.create(input);

    return {
      id,
      message: this.i18n.translate(I18n.MODULES.SERVICES.SERVICE_CREATED_SUCCESSFULLY.KEY),
    };
  }

  async findAll(filters: FilterServicesDto) {
    const builder = ServicesFilterBuilder.fromDto(filters);

    if (filters.search) builder.addSearch(filters.search);

    const total = await this.servicesRepository.count(builder);

    builder.addPagination(filters.page, filters.take, total);
    builder.addOrderBy({ createdAt: 'asc' });

    const { pagination, services } = await this.servicesRepository.findAll(builder);

    return { services, pagination };
  }


  async findAvailability(serviceId: number, filters: FilterServicesAvailabilityDto) {
    const i18n = I18nContext.current();
    const language = i18n?.lang || process.env.FALLBACK_LANGUAGE;

    const builder = ServicesFilterAvailabilityBuilder.fromDto();
    builder.addServiceId(serviceId);

    if (filters.fromDate && filters.toDate) {
      builder.addRangeDate(filters.fromDate, filters.toDate);
    }

    const { appointments } = await this.servicesRepository.findAvailability(builder);

    const service = await this.servicesRepository.findById(serviceId);


    const serviceDuration = service.duration;
    const startTime = new Date(service.startTime);
    const endTime = new Date(service.endTime);


    const allDates = generateAllDates(filters.fromDate, filters.toDate);
    const now = toZonedTime(new Date(), 'America/Sao_Paulo');

    const dateFormatter = new Intl.DateTimeFormat(language, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const availableDates = await Promise.all(allDates.map(date => {
      const availableTimes: { hours: string, day: string }[] = [];

      for (let hour = startTime.getHours(); hour < endTime.getHours(); hour++) {
        for (let minute = 0; minute < 60; minute += serviceDuration) {
          const startDateTime = new Date(date);
          startDateTime.setHours(hour, minute, 0, 0);



          const endDateTime = new Date(startDateTime);
          endDateTime.setMinutes(endDateTime.getMinutes() + serviceDuration);

          const endTimeLimit = endOfDay(new Date(date));

          let isAvailable = true;


          if (isSameDay(startDateTime, now) && startDateTime <= now) {
            isAvailable = false;

          }


          if (!isBefore(endDateTime, endTimeLimit)) {
            isAvailable = false;

          }


          if (appointments.some(appointment =>
            appointment.scheduledAt &&
            (
              isEqual(appointment.scheduledAt, startDateTime) ||
              isEqual(appointment.scheduledAt, endDateTime) ||
              (isAfter(appointment.scheduledAt, startDateTime) && isBefore(appointment.scheduledAt, endDateTime))
            )
          )) {
            isAvailable = false;
          }


          if (isAvailable && !availableTimes.some(time => time.hours === startDateTime.toISOString())) {
            const timeFormatter = new Intl.DateTimeFormat(language, {
              hour: '2-digit',
              minute: '2-digit',
            });

            availableTimes.push({
              hours: timeFormatter.format(startDateTime),
              day: dateFormatter.format(date),
            });
          }
        }
      }



      return {
        date: dateFormatter.format(date) as string,
        times: availableTimes,
      }
    }));

    return availableDates;
  }


  async checkAvailability(
    scheduleAvailability: {
      date: string;
      times: {
        hours: string;
        day: string;
      }[];
    }[],
    scheduledAt: Date) {
    const [schedule] = scheduleAvailability;

    const findScheduleAvailable = schedule.times.some(time => {
      const timeIsoString = convertToISOString({
        day: time.day,
        hours: time.hours,
      });

      return timeIsoString === scheduledAt.toISOString();
    });

    return findScheduleAvailable;
  }
}
