import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { Resource } from 'src/modules/resource/entity/resource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
  imports: [CommonModule, TypeOrmModule.forFeature([Resource])]
})
export class ResourceModule { }
