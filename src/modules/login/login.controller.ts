import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ForgotPasswordDto, LoginDto } from 'src/common/dto/login.dto';
import { OtpService } from 'src/otp.service';

@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly otpService: OtpService,
  ) {}

  @Post('auth')
  async login(@Body() credentials: LoginDto) {
    const data = await this.loginService.login(credentials);
    return {
      message: 'Login Successfully',
      data,
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.loginService.forgotPassword(forgotPasswordDto);
    return {
      message: 'Password changed successfully',
    };
  }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    const { user, otp } = await this.otpService.generateOtp(email);
    return { message: `OTP sent to ${email}`, userInfo: { user, otp } };
  }
}
