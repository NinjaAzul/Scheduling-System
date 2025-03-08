import { ApiProperty } from '@nestjs/swagger';

export class ValidationError {
  @ApiProperty({ description: 'The property that contains the error' })
  property: string;

  @ApiProperty({
    description: 'The error associated with the property',
    type: Object,
    additionalProperties: { type: 'string' },
  })
  error: Record<string, string>;

  @ApiProperty({
    description: 'Child validation errors',
    type: [String],
  })
  children: string[];
}

class MessageError {
  @ApiProperty({ description: 'The info of the error' })
  info: string;

  @ApiProperty({
    description: 'The errors of the error',
    type: [ValidationError],
  })
  errors: ValidationError[];
}

export class ValidationErrorResponseDto {
  @ApiProperty({ description: 'The HTTP status code' })
  statusCode: number;

  @ApiProperty({ description: 'The error message' })
  message: MessageError;

  @ApiProperty({ description: 'The error type' })
  error: string;

  constructor({
    statusCode,
    message,
    error,
  }: {
    statusCode: number;
    message: MessageError;
    error: string;
  }) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
