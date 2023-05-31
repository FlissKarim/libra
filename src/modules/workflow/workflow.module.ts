import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { WorkflowService } from './workflow-service';
import { User } from 'src/modules/user/entity/user';

@Module({
  controllers: [],
  providers: [WorkflowService],
  exports: [WorkflowService],
  imports: [CommonModule, TypeOrmModule.forFeature([User])]
})
export class WorkflowModule { }
