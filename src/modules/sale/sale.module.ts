import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ProductModule } from '../product/product.module';
import { ResourceModule } from '../resource/resource.module';
import { ViewModule } from '../viewer/viewer.module';

@Module({
  controllers: [],
  exports: [],
  providers: [],
  imports: [CommonModule, ProductModule, ResourceModule, ViewModule]
})
export class SaleModule { }
