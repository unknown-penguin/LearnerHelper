import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.getUserById(id);
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
