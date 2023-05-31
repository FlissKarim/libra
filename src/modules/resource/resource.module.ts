import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { Resource } from 'src/modules/resource/entity/resource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { ResourceRepository } from './resource.repository';

@Module({
  controllers: [ResourceController],
  providers: [ResourceRepository],
  exports: [ResourceRepository],
  imports: [CommonModule, TypeOrmModule.forFeature([Resource])]
})
export class ResourceModule { }
