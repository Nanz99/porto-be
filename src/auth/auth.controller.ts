import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: SignUpDto })
  registerUser(@Body() data: SignUpDto): Promise<any> {
    return this.authService.register(data);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  loginUser(@Body() data: LoginDto): Promise<any> {
    return this.authService.login(data);
  }
}
