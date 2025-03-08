import { ApiProperty } from '@nestjs/swagger';

export class CommonErrorResponseDto {
  @ApiProperty({ description: 'The status code of the error' })
  statusCode: number;

  @ApiProperty({ description: 'The message of the error' })
  message: string;

  @ApiProperty({ description: 'The error of the error' })
  error: string | null;

  constructor({
    statusCode,
    message,
    error,
  }: {
    statusCode: number;
    message: string;
    error: string | null;
  }) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
