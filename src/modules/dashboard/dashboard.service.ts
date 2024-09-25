import { Injectable } from '@nestjs/common';
import { TaskStatus, TaskType } from 'src/common/enum/enum';
import { DashBoardRepo } from 'src/repository/dashboard.repo';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepo: DashBoardRepo) {}
  async fetchDashBoardCounts() {
    const [
      userCount,
      projectCount,
      taskCount,
      bugCount,
      toDoCount,
      inProgressCount,
      resolvedCount,
      reopenedCount,
    ] = await Promise.all([
      this.dashboardRepo.getUserCount(),
      this.dashboardRepo.getProjectCount(),
      this.dashboardRepo.getTaskCountByTypeId(0),
      this.dashboardRepo.getTaskCountByTypeId(TaskType.Bug),
      this.dashboardRepo.getTaskStatusByStatusId(TaskStatus.ToDO),
      this.dashboardRepo.getTaskStatusByStatusId(TaskStatus.InProgress),
      this.dashboardRepo.getTaskStatusByStatusId(TaskStatus.Resolved),
      this.dashboardRepo.getTaskStatusByStatusId(TaskStatus.Reopened),
    ]);
    return {
      userCount,
      projectCount,
      taskCount,
      bugCount,
      toDoCount,
      inProgressCount,
      resolvedCount,
      reopenedCount,
    };
  }
}
