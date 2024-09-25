import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepo } from 'src/repository/project.repo';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepo],
})
export class ProjectModule {}
