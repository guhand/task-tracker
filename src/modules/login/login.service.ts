import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ForgotPasswordDto, LoginDto } from 'src/common/dto/login.dto';
import { AppError } from 'src/common/enum/enum';
import { UserRepo } from 'src/repository/user.repo';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/common/utils/utils';

@Injectable()
export class LoginService {
  constructor(private readonly userRepo: UserRepo) {}
  async login(credentials: LoginDto) {
    try {
      const user = await this.userRepo.findUserByEmail(credentials.email);
      if (!user) throw new BadRequestException(AppError.USER_NOT_FOUND);
      if (
        !(await bcrypt.compare(
          credentials.password,
          user?.UserPasswords[0].password,
        ))
      )
        throw new BadRequestException('Password not match');
      const token = await generateToken(user?.id, user?.roleId);
      return await this.userRepo.updateToken(user.id, token);
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword({ email, otp, newPassword }: ForgotPasswordDto) {
    try {
      const user = await this.userRepo.findUserByEmail(email);
      if (!user) throw new NotFoundException('Email not found');

      const isValidOtp = await this.userRepo.isValidOtp(user.id, otp);
      if (!isValidOtp) throw new NotFoundException('Invalid OTP');

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepo.updatePassword(
        user.id,
        user.UserPasswords[0].id,
        hashedPassword,
      );
    } catch (error) {
      throw error;
    }
  }
}
