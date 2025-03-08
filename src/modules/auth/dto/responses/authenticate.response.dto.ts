import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ description: 'Whether the user is active' })
  active: boolean;

  @ApiProperty({ description: 'The date the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the user was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'The role of the user' })
  role: RoleDto;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

export class AuthenticateResponseDto {
  @ApiProperty({ description: 'The user object' })
  user: UserDto;

  @ApiProperty({ description: 'The authentication token' })
  token: string;
}
