import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';

@Injectable()
export class UserRepo {
  constructor(private readonly db: PrismaService) {}

  async createUser(
    { firstName, lastName, email, phoneNumber: mobile, roleId }: CreateUserDto,
    hashedPassword: string,
    creatorId: number,
  ) {
    await this.db.user.create({
      data: {
        firstName,
        lastName,
        email,
        mobile,
        roleId,
        creatorId,
        UserPasswords: { create: { password: hashedPassword } },
      },
    });
  }

  async isMobileExist(mobile: string) {
    return (
      (await this.db.user.count({
        where: { isActive: true, mobile: mobile },
      })) > 0
    );
  }

  async isEmailExist(email: string) {
    return (await this.db.user.count({ where: { isActive: true, email } })) > 0;
  }

  async isMobileExistExceptId(userId: number, mobile: string) {
    return (
      (await this.db.user.count({
        where: { isActive: true, mobile, id: { not: userId } },
      })) > 0
    );
  }

  async isEmailExistExceptId(userId: number, email: string) {
    return (
      (await this.db.user.count({
        where: { id: { not: userId }, isActive: true, email },
      })) > 0
    );
  }

  async findUserByEmail(email: string) {
    return await this.db.user.findFirst({
      where: { email },
      include: { UserPasswords: { where: { isActive: true } } },
    });
  }

  async getUsersCount(filterBySearch: Prisma.UserWhereInput) {
    return await this.db.user.count({ where: filterBySearch });
  }

  async findAllUsers(
    page: number,
    itemsPerPage: number,
    filterBySearch: Prisma.UserWhereInput,
  ) {
    return await this.db.user.findMany({
      skip: page > 1 ? (page - 1) * itemsPerPage : 0,
      take: itemsPerPage,
      where: filterBySearch,
      include: {
        Role: { select: { id: true, role: true } },
        CreatedUsers: { select: { id: true, firstName: true, lastName: true } },
        CreatedProjects: { where: { isActive: true } },
        Tasks: { where: { isActive: true } },
      },
    });
  }

  async findUserById(id: number) {
    return await this.db.user.findFirst({
      where: { isActive: true, id },
      include: { UserPasswords: true },
    });
  }

  async updateToken(id: number, token: string) {
    return await this.db.user.update({
      where: { id },
      data: { token },
      select: {
        token: true,
        id: true,
        firstName: true,
        lastName: true,
        Role: { select: { role: true } },
      },
    });
  }

  async updateUser(
    { firstName, lastName, email, phoneNumber: mobile, roleId }: UpdateUserDto,
    userId: number,
    modifierId: number,
  ) {
    await this.db.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        mobile,
        modifierId,
        roleId,
      },
    });
  }

  async updatePassword(
    userId: number,
    passwordId: number,
    newPassword: string,
  ) {
    await this.db.userPassword.update({
      where: { id: passwordId, userId, isActive: true },
      data: { password: newPassword },
    });
  }

  async isValidOtp(userId: number, otp: string) {
    return await this.db.userPassword.findFirst({
      where: { userId, otp, isActive: true },
    });
  }
}
