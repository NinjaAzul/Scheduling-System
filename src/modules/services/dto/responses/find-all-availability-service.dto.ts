import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class TimeSlot {
    @ApiPropertyOptional({ description: 'The hours of the time slot' })
    hours: string;

    @ApiPropertyOptional({ description: 'The day of the time slot' })
    day: string;
}

export class FindAllAvailabilityServiceResponseDto {
    @ApiProperty({ description: 'The date of the availability' })
    date: string;

    @ApiProperty({
        description: 'The available times for the date',
        type: [TimeSlot],
    })
    times: TimeSlot[] | [];
}
