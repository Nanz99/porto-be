import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  registerUser(@Body() data: SignUpDto): Promise<any> {
    return this.authService.register(data);
  }
  @Post('/login')
  loginUser(@Body() data: LoginDto): Promise<any> {
    return this.authService.login(data);
  }
}
