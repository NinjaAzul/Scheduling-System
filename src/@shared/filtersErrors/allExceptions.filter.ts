import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { CommonErrorResponseDto } from '../responses/common-error.response.dto';
import { ValidationError } from 'class-validator';
import { UnprocessableEntityException } from '@nestjs/common';
import { formatValidationError } from './formatValidationError';

@Catch()
export class AllExceptionsFilter
  extends BaseExceptionFilter
  implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      console.warn(
        '---------------------------------------------------------------------',
      );
      console.warn(
        `AllExceptionsFilter: ${request.url.toUpperCase()} MODULE [${new Date().toLocaleString()}]`,
      );

      console.warn({
        request: {
          method: request.method,
          url: request.url,
          headers: request.headers,
          body: request.body,
          query: request.query,
          params: request.params,
          user: request.user,
        },
      });
      console.warn(
        '---------------------------------------------------------------------',
      );
      console.warn('Stack:', exception.stack);
      console.warn(
        '---------------------------------------------------------------------',
      );
    }

    const responseFiltered: CommonErrorResponseDto = {
      statusCode: status,
      message: exception.message || 'Internal Server Error',
      error: exception.error || null,
    };

    response.status(status).json(responseFiltered);
  }
}
