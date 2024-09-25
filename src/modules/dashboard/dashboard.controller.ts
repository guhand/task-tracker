import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/common/guards/auth';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(AuthGuard)
  async fetchDashBoardCounts() {
    return {
      message: 'Dashboard counts fetched successfully',
      data: await this.dashboardService.fetchDashBoardCounts(),
    };
  }
}
