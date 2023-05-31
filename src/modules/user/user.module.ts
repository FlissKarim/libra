import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from 'src/modules/user/entity/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { UserRepository } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserRepository],
  providers: [UserRepository],
  imports: [CommonModule, TypeOrmModule.forFeature([User])]
})
export class UserModule { }
