import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  login(@Query('email') email: string, @Query('password') password: string): Promise<UserDto> {
    return this.userService.login(email, password);
  }

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.getUserById(id);
  }

  @Get(':id/verify')
  verifyUser(@Param('id') id: string): Promise<void> {
    return this.userService.verifyUser(id);
  }

  @Post('createUser')
  createUser(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(data);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UserDto> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
