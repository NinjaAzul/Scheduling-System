import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import {
  ONLY_LETTERS_WITH_SPACE_REGEX,
  VALIDATE_PASSWORD_REGEX,
} from 'src/@shared/regex';
import { I18n, polyglot } from 'src/@shared/i18n';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    required: true,
  })
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  @Matches(
    ONLY_LETTERS_WITH_SPACE_REGEX,
    polyglot(I18n.MESSAGES.IS_ONLY_LETTERS_WITH_SPACE_MESSAGE),
  )
  @Length(3, 50, polyglot(I18n.MESSAGES.IS_LENGTH_MESSAGE, { min: 3, max: 50 }))
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    required: true,
  })
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  @IsEmail({}, polyglot(I18n.MESSAGES.IS_EMAIL_VALID_MESSAGE))
  @Length(3, 50, polyglot(I18n.MESSAGES.IS_LENGTH_MESSAGE, { min: 3, max: 50 }))
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    required: true,
  })
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  @Length(8, 50, polyglot(I18n.MESSAGES.IS_LENGTH_MESSAGE, { min: 8, max: 50 }))
  @Matches(
    VALIDATE_PASSWORD_REGEX,
    polyglot(I18n.MESSAGES.IS_PASSWORD_VALID_MESSAGE),
  )
  password: string;

  @ApiProperty({
    description: 'The role id of the user',
    required: true,
  })
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
  roleId: number;
}
