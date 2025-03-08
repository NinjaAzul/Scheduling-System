import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FilterUsersDto, UpdateUserDto } from './dto/requests';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/@shared/guards';
import {
  CommonErrorResponseDto,
  CommonResponseWithIdDto,
  ValidationErrorResponseDto,
} from 'src/@shared/responses';
import { FindAllUsersResponseDto, FindUserResponseDto } from './dto';

@Controller('users')
@UseGuards(AuthGuard)
@ApiTags('Users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CommonResponseWithIdDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User already exists',
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Validation error',
    type: ValidationErrorResponseDto,
  })
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CommonResponseWithIdDto> {
    return this.usersService.create(createUserDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully retrieved.',
    type: FindAllUsersResponseDto,
  })
  findAll(
    @Query() filters: FilterUsersDto,
  ): Promise<FindAllUsersResponseDto | []> {
    return this.usersService.findAll(filters);
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: FindUserResponseDto,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindUserResponseDto | null> {
    return this.usersService.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: CommonResponseWithIdDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User not found',
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Validation error',
    type: ValidationErrorResponseDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: CommonResponseWithIdDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User not found',
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Validation error',
    type: ValidationErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: CommonErrorResponseDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
