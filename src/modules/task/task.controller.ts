import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  CreateTaskDto,
  GetTaskDto,
  UpdateTaskDto,
} from 'src/common/dto/task.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUserId } from 'src/common/decorators/decorators';
import { AuthGuard } from 'src/common/guards/auth';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createTask(
    @CurrentUserId() creatorId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    await this.taskService.createTask(creatorId, files, createTaskDto);
    return {
      message: 'Task created successfully',
    };
  }

  @Get('all/:projectId')
  async getTasks(
    @Param('projectId') projectId: string,
    @Query()
    data: GetTaskDto,
  ) {
    return {
      message: 'Tasks fetched successfully',
      data: await this.taskService.getTasks(+projectId, data),
    };
  }

  @Patch(`:taskId`)
  @UseInterceptors(FilesInterceptor('files'))
  async updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body()
    updateTaskDto: UpdateTaskDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUserId()
    modifierId: number,
    @Req() req: any,
  ) {
    await this.taskService.updateTask(
      +taskId,
      updateTaskDto,
      files,
      modifierId,
      req?.user?.Role.id,
    );
    return {
      message: 'Task updated successfully',
    };
  }

  @Delete('image/:id')
  @UseGuards(AuthGuard)
  async deleteImageFromTask(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteImageFromTask(id);
    return {
      message: 'Image deleted successfully',
    };
  }
}
