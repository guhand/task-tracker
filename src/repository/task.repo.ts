import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from 'src/common/dto/task.dto';
import { TaskStatus } from 'src/common/enum/enum';

@Injectable()
export class TaskRepo {
  constructor(private readonly db: PrismaService) {}
  async createTask(
    creatorId: number,
    files: Express.Multer.File[],
    { title, description, projectId, typeId, taskAssigneeIds }: CreateTaskDto,
  ) {
    await this.db.task.create({
      data: {
        title,
        description,
        projectId,
        typeId,
        statusId: TaskStatus.ToDO,
        creatorId,
        TaskAssignees: {
          create: taskAssigneeIds.map((userId) => ({ userId: +userId })),
        },
        TaskImages: { create: files.map((file) => ({ image: file.filename })) },
      },
    });
  }

  async getTasksCount(filter: Prisma.TaskWhereInput) {
    return await this.db.task.count({ where: filter });
  }

  async getTasks(
    page: number,
    itemsPerPage: number,
    filter: Prisma.TaskWhereInput,
  ) {
    return await this.db.task.findMany({
      where: filter,
      skip: page > 1 ? (page - 1) * itemsPerPage : 0,
      take: itemsPerPage,
      include: {
        Project: {
          select: { id: true, title: true },
        },
        TaskCreator: { select: { id: true, firstName: true, lastName: true } },
        TaskModifier: {
          select: { id: true, firstName: true, lastName: true },
        },
        TaskImages: {
          where: { isActive: true },
          select: { id: true, image: true },
        },
        TaskAssignees: {
          where: { isActive: true },
          select: {
            TaskToUser: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async findTaskById(id: number) {
    return await this.db.task.findFirst({ where: { isActive: true, id } });
  }

  async findTaskAssignedToUser(taskId: number, userId: number) {
    return await this.db.task.count({
      where: {
        id: taskId,
        isActive: true,
        TaskAssignees: {
          some: { isActive: true, userId: userId },
        },
      },
    });
  }

  async updateTask(
    taskId: number,
    {
      title,
      description,
      status: statusId,
      typeId,
      taskAssigneeIds,
    }: UpdateTaskDto,
    files: Express.Multer.File[],
    modifierId: number,
  ) {
    await this.db.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        statusId,
        typeId,
        modifierId,
        TaskAssignees:
          taskAssigneeIds.length > 0
            ? {
                updateMany: {
                  where: { taskId },
                  data: { isActive: false },
                },
                create: taskAssigneeIds.map((userId) => ({ userId: +userId })),
              }
            : undefined,
        TaskImages:
          files.length > 0
            ? {
                updateMany: { where: { taskId }, data: { isActive: false } },
                create: files.map((file) => ({ image: file.filename })),
              }
            : undefined,
      },
    });
  }
  async deleteImageFromTask(imageId: number) {
    await this.db.taskImage.updateMany({
      where: {
        id: imageId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }
}
