// Start of Selection

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/infrastructure';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { translations } from 'src/@shared/i18n';

import { RoleDecorators, ROLES_KEY } from 'src/@shared/decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    const roles = this.reflector.getAllAndOverride<
      RoleDecorators | RoleDecorators[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    const i18n = I18nContext.current();
    const language = i18n?.lang || process.env.FALLBACK_LANGUAGE || 'pt-BR';

    if (!token) {
      throw new UnauthorizedException(
        translations[language].MODULES.AUTH_SERVICE.TOKEN_IS_NOT_VALID,
      );
    }

    try {
      const { sub: userId }: { sub: number } =
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          active: true,
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException(
          translations[language].MODULES.AUTH_SERVICE.TOKEN_IS_NOT_VALID,
        );
      }

      request.user = user;
      request.token = token;

      if (!roles) {
        return true;
      }

      const hasRole = Array.isArray(roles)
        ? roles.some((role) => role.roles.includes(user.role.id))
        : roles.roles.includes(user.role.id);

      if (!hasRole) {
        throw new UnauthorizedException(
          translations[language].MODULES.AUTH_SERVICE.DO_NOT_HAVE_PERMISSION,
        );
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(
        translations[language].MODULES.AUTH_SERVICE.DO_NOT_HAVE_PERMISSION,
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
