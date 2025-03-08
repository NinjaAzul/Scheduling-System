import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ONLY_LETTERS_WITH_SPACE_REGEX } from 'src/@shared/regex';
import { I18n, polyglot } from 'src/@shared/i18n';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    required: true,
  })
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  @IsOptional()
  @Matches(
    ONLY_LETTERS_WITH_SPACE_REGEX,
    polyglot(I18n.MESSAGES.IS_ONLY_LETTERS_WITH_SPACE_MESSAGE),
  )
  @Length(3, 50, polyglot(I18n.MESSAGES.IS_LENGTH_MESSAGE, { min: 3, max: 50 }))
  name?: string;

  @ApiProperty({
    description: 'The email of the user',
    required: true,
  })
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  @IsOptional()
  @IsEmail({}, polyglot(I18n.MESSAGES.IS_EMAIL_VALID_MESSAGE))
  @Length(3, 50, polyglot(I18n.MESSAGES.IS_LENGTH_MESSAGE, { min: 3, max: 50 }))
  email?: string;

  @ApiProperty({
    description: 'The role id of the user',
    required: true,
  })
  @IsOptional()
  @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
  roleId?: number;
}
