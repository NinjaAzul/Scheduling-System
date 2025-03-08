import { ApiProperty } from '@nestjs/swagger';

class RoleDto {
  @ApiProperty({ description: 'The role ID' })
  id: number;

  @ApiProperty({ description: 'The role name' })
  name: string;
}

export class FindUserResponseDto {
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
