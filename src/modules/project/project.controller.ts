import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  CreateProjectDto,
  GetProjectDto,
  UpdateProjectDto,
} from 'src/common/dto/project.dto';
import { CurrentUserId } from 'src/common/decorators/decorators';
import { AdminAuthGuard } from 'src/common/guards/admin.auth';
import { AuthGuard } from 'src/common/guards/auth';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUserId() creatorId: number,
  ) {
    await this.projectService.createProject(createProjectDto, creatorId);
    return {
      message: 'Project created successfully',
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async fetchProjects(@Query() { page, search }: GetProjectDto) {
    return {
      message: 'Projects fetched successfully',
      data: await this.projectService.fetchProjects(page, search),
    };
  }

  @Patch()
  @UseGuards(AdminAuthGuard)
  async updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUserId() modifierId: number,
  ) {
    await this.projectService.updateProject(updateProjectDto, modifierId);
    return {
      message: 'Project details updated successfully',
    };
  }
}
