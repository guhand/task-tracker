import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateTaskDto,
  GetTaskDto,
  UpdateTaskDto,
} from 'src/common/dto/task.dto';
import { paginatedResponse } from 'src/common/utils/utils';
import { TaskRepo } from 'src/repository/task.repo';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepo) {}
  async createTask(
    creatorId: number,
    files: Express.Multer.File[],
    data: CreateTaskDto,
  ) {
    try {
      await this.taskRepo.createTask(creatorId, files, data);
    } catch (error) {
      throw error;
    }
  }

  async getTasks(
    projectId: number,
    {
      page,
      search,
      type: typeId,
      status: statusId,
      user: assigneeId,
    }: GetTaskDto,
  ) {
    try {
      const filter: Prisma.TaskWhereInput = {
        isActive: true,
        projectId: projectId > 0 ? projectId : undefined,
        typeId: typeId > 0 ? typeId : undefined,
        statusId: statusId > 0 ? statusId : undefined,
        TaskAssignees:
          assigneeId > 0
            ? { some: { isActive: true, userId: assigneeId } }
            : undefined,
        OR:
          search != undefined && search.length > 0
            ? [
                {
                  title: { contains: search },
                },
                {
                  description: { contains: search },
                },
                {
                  TaskAssignees: {
                    some: {
                      TaskToUser: {
                        OR: [
                          {
                            firstName: { contains: search },
                          },
                          { lastName: { contains: search } },
                          { mobile: { contains: search } },
                          { email: { contains: search } },
                        ],
                      },
                    },
                  },
                },
              ]
            : undefined,
      };
      const itemsPerPage = 10;
      const [taskCounts, data] = await Promise.all([
        this.taskRepo.getTasksCount(filter),
        this.taskRepo.getTasks(page, itemsPerPage, filter),
      ]);
      return paginatedResponse(page, taskCounts, itemsPerPage, data);
    } catch (e) {
      throw e;
    }
  }

  async updateTask(
    taskId: number,
    data: UpdateTaskDto,
    files: Express.Multer.File[],
    modifierId: number,
    roleId: number,
  ) {
    try {
      if (!(await this.taskRepo.findTaskById(taskId)))
        throw new NotFoundException('Task not found');
      if (roleId == 2)
        if (!(await this.taskRepo.findTaskAssignedToUser(taskId, modifierId)))
          throw new NotFoundException('This task not assigned to you');
      await this.taskRepo.updateTask(taskId, data, files, modifierId);
    } catch (e) {
      throw e;
    }
  }

  async deleteImageFromTask(id: number) {
    try {
      await this.taskRepo.deleteImageFromTask(id);
    } catch (e) {
      throw e;
    }
  }
}
