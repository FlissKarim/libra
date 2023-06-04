import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { Product } from './entity/product';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [],
  exports: [],
  imports: [CommonModule, TypeOrmModule.forFeature([Product])]
})
export class ProductModule { }
