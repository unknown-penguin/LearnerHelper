import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  login(@Query('email') email: string, @Query('password') password: string) {
    return this.userService.login(email, password);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get(':id/verify')
  verifyUser(@Param('id') id: string) {
    return this.userService.verifyUser(id);
  }

  @Post()
  createUser(@Body() data: any) {
    return this.userService.createUser(data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
