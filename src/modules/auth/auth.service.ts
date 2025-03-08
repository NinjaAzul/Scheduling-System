import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { I18n } from 'src/@shared/i18n';

import { UsersRepository } from 'src/modules/users/users.repository';

import { AuthenticateRequestDTO } from './dto/requests';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly i18nService: I18nService,
  ) {}

  async authenticate(authenticateDTO: AuthenticateRequestDTO) {
    const { email, password } = authenticateDTO;

    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        this.i18nService.translate(
          I18n.MODULES.AUTH_SERVICE.PASSWORD_OR_EMAIL_INVALID.KEY,
        ),
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(
        this.i18nService.translate(
          I18n.MODULES.AUTH_SERVICE.PASSWORD_OR_EMAIL_INVALID.KEY,
        ),
      );
    }

    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }

  async me(userId: number, token: string) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException(
        this.i18nService.translate(I18n.MODULES.USERS.USER_NOT_FOUND.KEY),
      );
    }

    return {
      user,
      token,
    };
  }
}
