import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  CreateServiceDto,
  FilterServicesAvailabilityDto,
  FilterServicesDto,
  FindAllAvailabilityServiceResponseDto,
  FindAllServicesResponseDto,
} from './dto';
import { AuthGuard } from 'src/@shared/guards';
import { Roles } from 'src/@shared/decorators';
import { RoleEnum } from 'src/@shared/enums';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CommonResponseDto,
  ValidationErrorResponseDto,
} from 'src/@shared/responses';

@UseGuards(AuthGuard)
@Controller('services')
@ApiTags('Services')
@ApiBearerAuth('access-token')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Roles({ roles: [RoleEnum.ADMINISTRATOR] })
  @Post('/create')
  @ApiOperation({ summary: 'Create a new service' })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    status: 201,
    description: 'The service has been successfully created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: CommonResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Validation error',
    type: ValidationErrorResponseDto,
  })
  create(
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<CommonResponseDto> {
    return this.servicesService.create(createServiceDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({
    status: 200,
    description: 'The services have been successfully retrieved.',
    type: FindAllServicesResponseDto,
  })
  findAll(
    @Query() filters: FilterServicesDto,
  ): Promise<FindAllServicesResponseDto> {
    return this.servicesService.findAll(filters);
  }

  @Get('/availability/:serviceId')
  @ApiOperation({ summary: 'Get all availability for a service' })
  @ApiResponse({
    status: 200,
    description: 'The availability has been successfully retrieved.',
    type: [FindAllAvailabilityServiceResponseDto],
  })
  findAvailability(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Query() filters: FilterServicesAvailabilityDto,
  ): Promise<FindAllAvailabilityServiceResponseDto[]> {
    return this.servicesService.findAvailability(serviceId, filters);
  }
}
