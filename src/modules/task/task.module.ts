import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepo } from 'src/repository/task.repo';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination(req, file, cb) {
          const destination = process.cwd() + '/public/task';
          if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
          }
          cb(null, destination);
        },
        filename(req, file, callback) {
          const customFileName = `${Math.floor(
            100000 + Math.random() * 900000,
          )}-${new Date().toISOString()}.${
            file.originalname.toLowerCase().split('.')[1]
          }`;
          callback(null, customFileName);
        },
      }),
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepo],
})
export class TaskModule {}
