import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { IsInt, IsString } from "class-validator";

class CreateTaskDto {
  @IsString()
  name: string;

  @IsInt()
  userId: number;

  @IsString()
  priority: string;
}

@Controller("task")
export class TaskController {
  constructor(
    private readonly taskService: TaskService) {
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const { name, userId, priority } = createTaskDto;
    try {
      await this.taskService.addTask(name, userId, Number(priority));
      return { status: HttpStatus.CREATED };
    } catch (error) {
      throw new HttpException("Task creation failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/user/:userId")
  async getUserTasks(@Param("userId") userId: string) {
    const id = parseInt(userId, 10);
    if (isNaN(id) || id < 1) {
      throw new HttpException("Invalid user ID", HttpStatus.BAD_REQUEST);
    }
    return await this.taskService.getUserTasks(id);

  }
  async resetData(): Promise<void> {
    await this.taskService.resetData();
  }
}
