import { AppRoutingModule } from "./app.routing-module";
import { ConfigurationModule } from "./infrastructure/configuration/configuration.module";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { PrismaService } from "./prisma.service";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma.module";
import { TaskModule } from "./task/task.module";
import { TaskController } from "./task/task.controller";
import { TaskService } from "./task/task.service";

@Module({
  imports: [AppRoutingModule, ConfigurationModule, DatabaseModule, UserModule, PrismaModule, TaskModule],
  controllers: [UserController, TaskController],
  providers: [UserService, TaskService, PrismaService]
})
export class AppModule {
}
