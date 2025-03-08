import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto {
  @ApiProperty({ description: 'The total number of items' })
  skip?: number;

  @ApiProperty({ description: 'The total number of pages' })
  page?: number;

  @ApiProperty({ description: 'The total number of items per page' })
  take?: number;

  @ApiProperty({ description: 'The total number of pages' })
  totalPages?: number;
}
