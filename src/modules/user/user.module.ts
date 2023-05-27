import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { User } from 'src/entity/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
  imports: [CommonModule, TypeOrmModule.forFeature([User])]
})
export class UserModule { }
