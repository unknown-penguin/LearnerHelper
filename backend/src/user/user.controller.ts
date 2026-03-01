import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() body: LoginDto): Promise<UserDto> {
    return this.userService.login(body.email, body.password);
  }

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.getUserById(id);
  }

  @Post()
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
