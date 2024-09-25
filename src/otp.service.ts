import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from './common/database/prisma.service';
import { Config } from './common/config/config';
import { UserRepo } from './repository/user.repo';

@Injectable()
export class OtpService {
  constructor(
    private readonly db: PrismaService,
    private readonly userRepo: UserRepo,
  ) {}

  async generateOtp(email: string) {
    //Find user by email
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) throw new NotFoundException('Email not found');

    // Generate OTP logic (e.g., random number generation)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP to the database
    await this.db.userPassword.update({
      where: { id: user.id },
      data: {
        otp,
      },
    });

    // Send the OTP via email
    await this.sendOtpEmail(email, otp);

    return { otp, user };
  }

  async sendOtpEmail(email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: Config.smtp_host,
      port: Config.smtp_port,
      secure: Config.smtp_secure,
      auth: {
        user: Config.smtp_user,
        pass: Config.smtp_pass,
      },
    });

    const mailOptions = {
      from: Config.smtp_user,
      to: email,
      subject: Config.smtp_display,
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
