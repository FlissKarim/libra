import { Body, Controller, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { SigninRequestDto } from './dto/request/signin.dto';
import { SignupRequestDto } from './dto/request/signup.dto';
import { SigninResponseDto } from './dto/response/signin.dto';
import { SignupResponseDto } from './dto/response/signup.dto';
import { SigninService } from './services/signin.service';
import { SignupService } from './services/signup.service';

@ApiBearerAuth()
@ApiTags(`[/auth] - Authorization module`)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinService: SigninService,
    private readonly signupService: SignupService,
  ) { }

  @Post('signin')
  public signin(@Body() body: SigninRequestDto): Promise<SigninResponseDto> {
    return this.signinService.singin(body);
  }

  @Post('signup')
  public signup(@Body() body: SignupRequestDto): Promise<SignupResponseDto> {
    return this.signupService.signup(body);
  }

  @Post('passport/signin')
  @UseGuards(AuthGuard('local'))
  @ApiResponse({
    status: HttpStatus.OK,
    type: SigninResponseDto,
  })
  public passportSignin(@Request() req) {
    return req.user;
  }
}
