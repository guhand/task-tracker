import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Config } from '../config/config';
import { Role } from '../enum/enum';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly db: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const verificationResponse: any = verify(token, Config.SECRET_KEY);
        if (verificationResponse) {
          const user = await this.db.user.findFirst({
            where: {
              id: +verificationResponse.userId,
              isActive: true,
              token,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              mobile: true,
              Role: { select: { id: true, role: true } },
            },
          });
          if (user.Role.id == Role.Admin) {
            req.user = user;
            return true;
          } else {
            throw new ForbiddenException('Admin can only access the resource');
          }
        } else {
          throw new UnauthorizedException('Wrong Authentication token');
        }
      } else {
        throw new UnauthorizedException('Authentication token missing');
      }
    } catch (error) {
      throw error;
    }
  }
}
