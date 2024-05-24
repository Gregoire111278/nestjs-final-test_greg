import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";

class CreateUserDto {
  email: string;
}

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    if (!this.isValidEmail(email)) {
      throw new HttpException("Invalid email", HttpStatus.BAD_REQUEST);
    }

    try {
      await this.userService.addUser(email);
      return { status: "success" };
    } catch (error) {
      throw new HttpException("User already exists", HttpStatus.CONFLICT);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async resetData(): Promise<void> {
    await this.userService.resetData();
  }
}
