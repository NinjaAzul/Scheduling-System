import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { I18n, polyglot } from 'src/@shared/i18n';

export class AuthenticateRequestDTO {
  @ApiProperty({
    description: 'The email of the user',
    required: true,
  })
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    required: true,
  })
  @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
  @IsNotEmpty(polyglot(I18n.MESSAGES.IS_NOT_EMPTY_MESSAGE))
  password: string;
}
