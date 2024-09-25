import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto } from 'src/common/dto/project.dto';
import { paginatedResponse } from 'src/common/utils/utils';
import { ProjectRepo } from 'src/repository/project.repo';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepo) {}
  async createProject(data: CreateProjectDto, creatorId: number) {
    try {
      await this.projectRepo.createProject(data, creatorId);
    } catch (error) {
      throw error;
    }
  }

  async fetchProjects(page: number, search: string) {
    try {
      const filterBySearch: Prisma.ProjectWhereInput = {
        isActive: true,
        OR:
          search != undefined && search.length > 0
            ? [
                { title: { contains: search } },
                { description: { contains: search } },
              ]
            : undefined,
      };
      const itemsPerPage = 10;
      const [projectsCount, data] = await Promise.all([
        this.projectRepo.getProjectsCount(filterBySearch),
        this.projectRepo.findAllProjects(page, itemsPerPage, filterBySearch),
      ]);
      return paginatedResponse(page, projectsCount, itemsPerPage, data);
    } catch (error) {
      throw error;
    }
  }

  async updateProject(data: UpdateProjectDto, modifierId: number) {
    try {
      if (!(await this.projectRepo.findProjectById(data.projectId)))
        throw new NotFoundException('Project not found');
      await this.projectRepo.updateProject(data, modifierId);
    } catch (error) {
      throw error;
    }
  }
}
