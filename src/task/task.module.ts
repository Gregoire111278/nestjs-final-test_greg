import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { PrismaModule } from "../prisma.module";
import { PrismaService } from "../prisma.service";

@Module({
  imports: [PrismaModule],
  providers: [TaskService, PrismaService],
  controllers: [TaskController]
})
export class TaskModule {
}
