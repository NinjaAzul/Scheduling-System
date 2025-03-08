import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { I18n, polyglot } from 'src/@shared/i18n';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'The name of the service',
    required: true,
  })
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  name: string;

  @ApiProperty({
    description: 'The duration of the service',
    required: true,
  })
  @IsNumber({}, polyglot(I18n.MESSAGES.IS_NUMBER_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  duration: number;

  @ApiProperty({
    description: 'The price of the service',
    required: true,
  })
  @IsNumber({}, polyglot(I18n.MESSAGES.IS_NUMBER_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  price: number;

  @ApiProperty({
    description: 'The start hour of the service',
    required: true,
  })
  @IsDateString({}, polyglot(I18n.MESSAGES.IS_INVALID_DATE_STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  startHour: string;

  @ApiProperty({
    description: 'The end hour of the service',
    required: true,
  })
  @IsDateString({}, polyglot(I18n.MESSAGES.IS_INVALID_DATE_STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  endHour: string;
}
