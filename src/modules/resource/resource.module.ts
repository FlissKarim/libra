import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { Resource } from 'src/entity/resource';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
  imports: [TypeOrmModule.forFeature([Resource])]
})
export class ResourceModule { }
