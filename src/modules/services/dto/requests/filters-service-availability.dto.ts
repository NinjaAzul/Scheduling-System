import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, MinDate } from 'class-validator';
import { I18n, polyglot } from 'src/@shared/i18n';

export class FilterServicesAvailabilityDto {
  @ApiProperty({
    description: 'The page number',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
  page?: number;

  @ApiProperty({
    description: 'The number of items per page',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
  take?: number;

  @ApiProperty({
    description: 'The from date',
    required: false,
  })
  @Transform(({ value }) => {
    const date = new Date(value);
    return date;
  })
  @IsDate(polyglot(I18n.MESSAGES.IS_DATE_MESSAGE))
  @MinDate(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  },
    polyglot(I18n.MESSAGES.IS_INVALID_DATE_TIME_MESSAGE)
  )
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  fromDate?: Date;

  @ApiProperty({
    description: 'The to date',
    required: false,
  })
  @Transform(({ value }) => {
    return new Date(value);
  })
  @IsDate(polyglot(I18n.MESSAGES.IS_DATE_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  toDate?: Date;
}
