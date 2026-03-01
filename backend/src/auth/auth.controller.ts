import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDto } from '../user/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto): Promise<UserDto> {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  register(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.authService.register(data);
  }
}
