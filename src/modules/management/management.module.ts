import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { ManagementService } from './management.service';
import { Ticket } from 'src/modules/management/entity/ticket';

@Module({
  controllers: [],
  providers: [ManagementService],
  exports: [ManagementService],
  imports: [CommonModule, TypeOrmModule.forFeature([Ticket, Comment])]
})
export class ManagementModule { }
