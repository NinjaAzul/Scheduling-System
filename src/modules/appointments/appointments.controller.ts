import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/requests/create-appointment.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/@shared/guards';
import { CommonErrorResponseDto, CommonResponseDto, ValidationErrorResponseDto } from '@/@shared/responses';
import { Request } from 'express';
import { FilterAppointmentsDto } from './dto/requests';
import { FindAllAppointmentsResponseDto } from './dto/responses';

@UseGuards(AuthGuard)
@Controller('appointments')
@ApiTags('Appointments')
@ApiBearerAuth('access-token')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }


  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({
    status: 201,
    description: 'The appointment has been successfully created.',
    type: CommonResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Service not available to appointment',
    type: ValidationErrorResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Validation error',
    type: ValidationErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: CommonResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: CommonResponseDto,
  })
  @Post('/create')
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req: Request): Promise<CommonResponseDto> {

    const user = req.user;

    return this.appointmentsService.create(createAppointmentDto, user);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({
    status: 200,
    description: 'The appointments have been successfully retrieved.',
    type: FindAllAppointmentsResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: CommonResponseDto,
  })
  @ApiResponse({})
  findAll(@Query() filters: FilterAppointmentsDto, @Req() req: Request): Promise<FindAllAppointmentsResponseDto> {

    const user = req.user;

    return this.appointmentsService.findAll(filters, user);
  }
}
