import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdatePasswordDto,
} from 'src/common/dto/user.dto';
import { AppError } from 'src/common/enum/enum';
import { UserRepo } from 'src/repository/user.repo';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PaginatedResponse, paginatedResponse } from 'src/common/utils/utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}
  async createUser(createUserDto: CreateUserDto, creatorId: number) {
    try {
      if (await this.userRepo.isMobileExist(createUserDto.phoneNumber))
        throw new BadRequestException(
          AppError.ALREADY_EXIST.replace('$', 'Mobile'),
        );

      if (await this.userRepo.isEmailExist(createUserDto.email))
        throw new BadRequestException(
          AppError.ALREADY_EXIST.replace('$', 'Email'),
        );

      const hashedPassword: string = await bcrypt.hash(
        createUserDto.password,
        10,
      );

      await this.userRepo.createUser(createUserDto, hashedPassword, creatorId);
    } catch (error) {
      throw error;
    }
  }

  async getUsers(page: number, search: string): Promise<PaginatedResponse> {
    try {
      const filterBySearch: Prisma.UserWhereInput = {
        isActive: true,
        OR:
          search != undefined && search.length > 0
            ? [
                { firstName: { contains: search } },
                { lastName: { contains: search } },
                { email: { contains: search } },
              ]
            : undefined,
      };
      const itemsPerPage = 10;
      const [usersCount, data] = await Promise.all([
        this.userRepo.getUsersCount(filterBySearch),
        this.userRepo.findAllUsers(page, itemsPerPage, filterBySearch),
      ]);
      return paginatedResponse(page, usersCount, itemsPerPage, data);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: number, data: UpdateUserDto, modifierId: number) {
    try {
      if (!(await this.userRepo.findUserById(userId)))
        throw new NotFoundException(AppError.USER_NOT_FOUND);
      else if (
        await this.userRepo.isMobileExistExceptId(userId, data.phoneNumber)
      )
        throw new BadRequestException(
          AppError.ALREADY_EXIST.replace('$', 'mobile'),
        );
      else if (await this.userRepo.isEmailExistExceptId(userId, data.email))
        throw new BadRequestException(
          AppError.ALREADY_EXIST.replace('$', 'email'),
        );
      await this.userRepo.updateUser(data, userId, modifierId);
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(
    userId: number,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    try {
      const user = await this.userRepo.findUserById(userId);

      const isOldPassword = await bcrypt.compare(
        oldPassword,
        user.UserPasswords[0].password,
      );
      if (!isOldPassword) throw new BadRequestException('Wrong old password');

      const passwordId = user.UserPasswords[0].id;
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.userRepo.updatePassword(userId, passwordId, hashedPassword);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
