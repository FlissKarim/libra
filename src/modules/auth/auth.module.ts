import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { SigninService } from './services/signin.service';
import { SignupService } from './services/signup.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  exports: [SigninService, SignupService, AuthService],
  providers: [SigninService, SignupService, AuthService, LocalStrategy],
})
export class AuthModule { }
