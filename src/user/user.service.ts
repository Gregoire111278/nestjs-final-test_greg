import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async addUser(email: string): Promise<void> {
    await this.prisma.user.create({ data: { email } });
  }

  async getUser(email: string) {
    return this.prisma.user.findUnique({ where: { email } });

  }

  async resetData(): Promise<void> {
    await this.prisma.user.deleteMany({});
    await this.prisma.task.deleteMany({});

  }
}
