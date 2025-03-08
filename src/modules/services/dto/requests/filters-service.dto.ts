import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { I18n, polyglot } from 'src/@shared/i18n';

export class FilterServicesDto {
  @ApiProperty({
    description: 'The search query',
    required: false,
  })
  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  search?: string;

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
  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  fromDate?: string;

  @ApiProperty({
    description: 'The to date',
    required: false,
  })
  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  toDate?: string;

  @ApiProperty({
    description: 'The service id',
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
  serviceId?: number;
}
