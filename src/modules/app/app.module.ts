import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { LoginModule } from '../login/login.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ProjectModule } from '../project/project.module';
import { PrismaModule } from 'src/common/database/prisma.module';
import { TaskModule } from '../task/task.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    LoginModule,
    DashboardModule,
    ProjectModule,
    TaskModule,
    ServeStaticModule.forRoot({
      rootPath: process.cwd() + '/public/task',
      serveRoot: '/api/task/image',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
