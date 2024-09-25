import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  GetUsersDto,
  UpdateUserDto,
  UpdatePasswordDto,
} from 'src/common/dto/user.dto';
import { CurrentUserId } from 'src/common/decorators/decorators';
import { AdminAuthGuard } from 'src/common/guards/admin.auth';
import { AuthGuard } from 'src/common/guards/auth';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @UseGuards(AdminAuthGuard)
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @CurrentUserId() creatorId: number,
  ) {
    await this.userService.createUser(createUserDto, creatorId);
    return {
      message: 'User created successfully',
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query() { page, search }: GetUsersDto) {
    return {
      message: 'Users fetched successfully',
      data: await this.userService.getUsers(page, search),
    };
  }

  @Patch(`:userId`)
  @UseGuards(AdminAuthGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId: string,
    @CurrentUserId() modifierId: number,
  ) {
    await this.userService.updateUser(+userId, updateUserDto, modifierId);
    return {
      message: 'User details updated successfully',
    };
  }

  @Patch('update-password')
  @UseGuards(AuthGuard)
  async updatePassword(
    @CurrentUserId() userId: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.userService.updatePassword(userId, updatePasswordDto);
    return {
      message: 'Password changed successfully',
    };
  }
}
