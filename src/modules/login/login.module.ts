import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserRepo } from 'src/repository/user.repo';
import { OtpService } from 'src/otp.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, UserRepo, OtpService],
})
export class LoginModule {}
