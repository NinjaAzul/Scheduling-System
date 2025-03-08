import { PaginationResponseDto } from 'src/@shared/responses';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class RoleDto {
  @ApiProperty({ description: 'The role ID' })
  id: number;

  @ApiProperty({ description: 'The role name' })
  name: string;
}

class UserDto {
  @ApiProperty({ description: 'The user ID' })
  id: number;

  @ApiProperty({ description: 'The user name' })
  name: string;

  @ApiProperty({ description: 'The user email' })
  email: string;

  @ApiProperty({ description: 'The user active' })
  active: boolean;

  @ApiProperty({ description: 'The user role', type: RoleDto })
  role: RoleDto;

  @ApiProperty({ description: 'The user created at' })
  createdAt: Date;

  @ApiProperty({ description: 'The user updated at' })
  updatedAt: Date;
}

export class FindAllUsersResponseDto {
  @ApiProperty({
    description: 'The users',
    type: [UserDto],
  })
  users: UserDto[];

  @ApiPropertyOptional({ description: 'The pagination' })
  pagination?: PaginationResponseDto;
}
