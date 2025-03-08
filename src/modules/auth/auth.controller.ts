import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthGuard } from 'src/@shared/guards';

import {
  AuthenticateRequestDTO,
  AuthenticateResponseDto,
  MeResponseDto,
} from './dto';
import { AuthService } from './auth.service';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CommonErrorResponseDto,
  ValidationErrorResponseDto,
} from '@/@shared/responses';

@ApiBearerAuth('access-token')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully authenticated.',
    type: AuthenticateResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    type: ValidationErrorResponseDto,
  })
  async authenticate(
    @Body() authenticateDTO: AuthenticateRequestDTO,
  ): Promise<AuthenticateResponseDto> {
    const result = await this.authService.authenticate(authenticateDTO);

    return result;
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get the current user' })
  @ApiResponse({
    status: 200,
    description: 'The current user has been successfully retrieved.',
    type: MeResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: CommonErrorResponseDto,
  })
  async me(@Req() req: Request): Promise<MeResponseDto> {
    const token = req.headers['authorization'];

    return this.authService.me(req.user.id, token);
  }
}
