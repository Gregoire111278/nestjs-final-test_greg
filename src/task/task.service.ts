import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()

export class TaskService {
  constructor(private readonly prisma: PrismaService) {
  }

  async addTask(name: string, userId: number, priority: number): Promise<any> {
    return this.prisma.task.create({
      data: { name, userId, priority }
    });
  }

  async getTaskByName(name: string) {
    return this.prisma.task.findFirst({ where: { name } });
  }

  async getUserTasks(userId: number) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async resetData(): Promise<void> {

    await this.prisma.task.deleteMany({});
    await this.prisma.user.deleteMany({});
  }
}
