import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, FilterUsersDto, UpdateUserDto } from './dto/requests';
import { UsersRepository } from './users.repository';
import { I18nService } from 'nestjs-i18n';
import { I18n } from 'src/@shared/i18n';
import { Prisma } from '@prisma/client';
import { generateHash } from 'src/@shared/helpers';
import { UsersFilterBuilder, UsersUpdateBuilder } from './buiders';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly i18nService: I18nService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, roleId } = createUserDto;

    const user = await this.usersRepository.findOneByEmail(email);

    if (user) {
      throw new BadRequestException(
        this.i18nService.translate(I18n.MODULES.USERS.USER_ALREADY_EXISTS.KEY),
      );
    }

    const inputUserCreate: Prisma.UserCreateManyInput = {
      email,
      name,
      password: await generateHash(password),
      roleId,
    };

    const { id } = await this.usersRepository.create(inputUserCreate);

    return {
      id,
      message: this.i18nService.translate(I18n.MODULES.USERS.USER_CREATED.KEY),
    };
  }

  async findAll(filters: FilterUsersDto) {
    const builder = UsersFilterBuilder.fromDto(filters);

    if (filters.search) builder.addSearch(filters.search);

    const total = await this.usersRepository.count(builder);

    builder.addPagination(filters.page, filters.take, total);
    builder.addOrderBy({ createdAt: 'asc' });

    const { users, pagination } = await this.usersRepository.findAll(builder);

    return { users, pagination };
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(
        this.i18nService.translate(I18n.MODULES.USERS.USER_NOT_FOUND.KEY),
      );
    }

    if (updateUserDto.email) {
      const userWithEmail = await this.usersRepository.findOneByEmail(
        updateUserDto.email,
      );

      if (userWithEmail && userWithEmail.id !== id) {
        throw new BadRequestException(
          this.i18nService.translate(
            I18n.MODULES.USERS.USER_ALREADY_EXISTS.KEY,
          ),
        );
      }
    }

    const userUpdateInput = new UsersUpdateBuilder(updateUserDto).build();

    const { id: userId } = await this.usersRepository.update(
      id,
      userUpdateInput,
    );

    return {
      id: userId,
      message: this.i18nService.translate(I18n.MODULES.USERS.USER_UPDATED.KEY),
    };
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(
        this.i18nService.translate(I18n.MODULES.USERS.USER_NOT_FOUND.KEY),
      );
    }

    const { id: userId } = await this.usersRepository.remove(id);

    return {
      id: userId,
      message: this.i18nService.translate(I18n.MODULES.USERS.USER_DELETED.KEY),
    };
  }
}
