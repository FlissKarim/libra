import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ViewerService } from './viewer.service';

@Module({
  controllers: [],
  exports: [ViewerService],
  providers: [ViewerService],
  imports: [CommonModule]
})
export class ViewModule { }
