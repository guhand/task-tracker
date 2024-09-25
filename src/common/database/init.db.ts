import { roles, taskStatus, taskTypes } from 'src/common/utils/utils';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

async function initAdmin(prisma: PrismaService) {
  const userCount = await prisma.user.count();
  if (!userCount) {
    await prisma.user.create({
      data: {
        firstName: 'Guhan',
        lastName: 'Dhakshanamurthy',
        email: 'guhandhakshanamurthy@gmail.com',
        mobile: '8438379027',
        roleId: 1,
        UserPasswords: {
          create: { password: await bcrypt.hash('8438379027', 10) },
        },
      },
    });
    await prisma.user.create({
      data: {
        firstName: 'Tamil',
        lastName: 'Selvam',
        email: 'tamilselvammuthuswamy@gmail.com',
        mobile: '8610525468',
        roleId: 1,
        UserPasswords: {
          create: { password: await bcrypt.hash('8610525468', 10) },
        },
      },
    });
  }
}
async function initRoles(prisma: PrismaService) {
  const roleCount = await prisma.role.count();
  if (roleCount == 0) {
    for (const role of roles) {
      await prisma.role.create({ data: { role: role } });
    }
  }
}

async function initTaskTypes(prisma: PrismaService) {
  const typeCount = await prisma.taskType.count();
  if (typeCount == 0) {
    for (const type of taskTypes) {
      await prisma.taskType.create({ data: { type: type } });
    }
  }
}

async function initTaskStatus(prisma: PrismaService) {
  const statusCount = await prisma.taskStatus.count();
  if (!statusCount) {
    for (const status of taskStatus) {
      await prisma.taskStatus.create({ data: { status: status } });
    }
  }
}

export async function initDB(prisma: PrismaService) {
  initAdmin(prisma);
  initRoles(prisma);
  initTaskTypes(prisma);
  initTaskStatus(prisma);
}
