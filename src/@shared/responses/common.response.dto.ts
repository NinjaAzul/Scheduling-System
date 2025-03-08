import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseWithIdDto {
  @ApiProperty({ description: 'The id of the entity' })
  id: number;

  @ApiProperty({ description: 'The message of the response' })
  message: string;
}

export class CommonResponseDto {
  @ApiProperty({ description: 'The message of the response' })
  message: string;
}
