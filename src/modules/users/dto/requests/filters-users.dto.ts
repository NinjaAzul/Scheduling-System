import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { generateBooleanValue } from 'src/@shared/helpers';
import { I18n, polyglot } from 'src/@shared/i18n';

export class FilterUsersDto {
  @ApiProperty({
    description: 'The search query',
    required: false,
  })
  @IsOptional()
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  search?: string;

  @ApiProperty({
    description: 'The active status of the user',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => generateBooleanValue(value))
  @IsBoolean(polyglot(I18n.MESSAGES.IS_BOOLEAN_MESSAGE))
  active?: boolean = true;

  @ApiProperty({
    description: 'The role id of the user',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
  roleId?: number;

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
}
