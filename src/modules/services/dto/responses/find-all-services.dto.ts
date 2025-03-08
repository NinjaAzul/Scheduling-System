import { IsDate } from 'class-validator';
import { PaginationResponseDto } from 'src/@shared/responses';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Service {
  @ApiProperty({ description: 'The name of the service' })
  name: string;

  @ApiProperty({ description: 'The id of the service' })
  id: number;

  @ApiProperty({ description: 'The duration of the service' })
  duration: number;

  @ApiProperty({ description: 'The start time of the service' })
  @IsDate()
  startTime: Date;

  @ApiProperty({ description: 'The end time of the service' })
  @IsDate()
  endTime: Date;

  @ApiProperty({ description: 'The price of the service' })
  price: number;

  @ApiProperty({ description: 'The created at date of the service' })
  createdAt: Date;

  @ApiProperty({ description: 'The updated at date of the service' })
  updatedAt: Date;
}

export class FindAllServicesResponseDto {
  @ApiProperty({ description: 'The services', type: [Service] })
  services: Service[] | [];

  @ApiPropertyOptional({ description: 'The pagination' })
  pagination?: PaginationResponseDto;
}
