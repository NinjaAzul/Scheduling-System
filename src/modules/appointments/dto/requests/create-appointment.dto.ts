import { I18n, polyglot } from '@/@shared/i18n';
import { IsNotEmpty, IsNumber, MinDate, IsOptional, IsDateString, IsString, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { toZonedTime } from 'date-fns-tz';
import { formatISODateToDate } from '@/@shared/helpers';

export class CreateAppointmentDto {
  @ApiPropertyOptional({
    description: 'The ID of the user',
    required: true,
  })
  @IsOptional()
  @IsNumber({}, I18n.MESSAGES.IS_NUMBER_MESSAGE)
  userId: number;

  @ApiProperty({
    description: 'The ID of the service',
    required: true,
  })
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  @IsNumber({}, I18n.MESSAGES.IS_NUMBER_MESSAGE)
  serviceId: number;

  @ApiProperty({
    description: 'The date and time of the appointment',
    required: true,
  })
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  @Transform(({ value }) => {
    return formatISODateToDate(value);
  })



  @Transform(({ value }) => {
    const date = new Date(value);
    return date;
  })
  @IsDate(polyglot(I18n.MESSAGES.IS_DATE_MESSAGE))
  @MinDate(() => {
    const now = new Date();
    const timeZone = 'America/Sao_Paulo';
    const zonedDate = toZonedTime(now, timeZone);
    return zonedDate;
  }, polyglot(I18n.MESSAGES.IS_INVALID_DATE_TIME_MESSAGE))
  scheduledAt: Date;
}
