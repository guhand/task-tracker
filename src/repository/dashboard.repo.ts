import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class DashBoardRepo {
  constructor(private readonly db: PrismaService) {}
  async getUserCount() {
    return await this.db.user.count({ where: { isActive: true } });
  }
  async getProjectCount() {
    return await this.db.project.count({ where: { isActive: true } });
  }

  async getTaskCountByTypeId(typeId: number) {
    return await this.db.task.count({
      where: { isActive: true, typeId: typeId > 0 ? typeId : undefined },
    });
  }

  async getTaskStatusByStatusId(statusId: number) {
    return await this.db.task.count({
      where: { isActive: true, statusId },
    });
  }
}
