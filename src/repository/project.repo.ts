import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/common/dto/project.dto';

@Injectable()
export class ProjectRepo {
  constructor(private readonly db: PrismaService) {}
  async createProject(
    { title, description }: CreateProjectDto,
    creatorId: number,
  ) {
    await this.db.project.create({ data: { title, description, creatorId } });
  }

  async getProjectsCount(filterBySearch: Prisma.ProjectWhereInput) {
    return await this.db.project.count({ where: filterBySearch });
  }

  async findAllProjects(
    page: number,
    itemsPerPage: number,
    filterBySearch: Prisma.ProjectWhereInput,
  ) {
    return await this.db.project.findMany({
      where: filterBySearch,
      skip: page > 1 ? (page - 1) * itemsPerPage : 0,
      take: itemsPerPage,
      include: {
        ProjectCreator: {
          select: { id: true, firstName: true, lastName: true },
        },
        ProjectModifier: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });
  }

  async updateProject(
    { projectId, description, title }: UpdateProjectDto,
    modifierId: number,
  ) {
    await this.db.project.update({
      where: { id: projectId },
      data: { title, description, modifierId },
    });
  }

  async findProjectById(projectId: number) {
    return await this.db.project.findFirst({
      where: { id: projectId, isActive: true },
    });
  }
}
