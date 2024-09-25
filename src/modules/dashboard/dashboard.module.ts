import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashBoardRepo } from 'src/repository/dashboard.repo';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, DashBoardRepo],
})
export class DashboardModule {}
