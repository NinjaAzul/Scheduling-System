import { PaginationResponseDto } from 'src/@shared/responses';
import { ApiProperty } from '@nestjs/swagger';

class ServiceDto {
    @ApiProperty({
        description: 'The ID of the service',
    })
    id: number;

    @ApiProperty({
        description: 'The name of the service',
    })
    name: string;

    @ApiProperty({
        description: 'The price of the service',
    })
    price: number;
}

export class AppointmentResponseDto {
    @ApiProperty({
        description: 'The ID of the appointment',
    })
    id: number;

    @ApiProperty({
        description: 'The date and time the appointment is scheduled for',
    })
    scheduledAt: Date;

    @ApiProperty({
        description: 'The date and time the appointment was created',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The date and time the appointment was last updated',
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'The ID of the user associated with the appointment',
    })
    userId: number;

    @ApiProperty({
        description: 'The service associated with the appointment',
        type: ServiceDto,
    })
    service: ServiceDto;
}

export class FindAllAppointmentsResponseDto {
    @ApiProperty({
        description: 'List of appointments',
        type: [AppointmentResponseDto],
    })
    appointments: AppointmentResponseDto[];

    @ApiProperty({
        description: 'Pagination information',
        type: PaginationResponseDto,
    })
    pagination: PaginationResponseDto;
}

