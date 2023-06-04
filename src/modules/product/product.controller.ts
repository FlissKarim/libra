import { Body, Controller, Put } from '@nestjs/common';
import { AbstractController } from '../common/abstract.controller';
import { UserAuthGuard } from '../auth/user-auth-guard';
import { EntityFilter } from '../common/entity.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from './entity/product';
import { ProductRepository } from './product.repository';

@ApiBearerAuth()
@ApiTags(`[/products] - Product module`)
@Controller('product')
export class ProductController extends AbstractController<Product> {
    constructor(
        protected readonly productRepository: ProductRepository,
        protected readonly entityFilter: EntityFilter<Product>
    ) {
        super(productRepository, entityFilter);
    }
    @Put()
    @UserAuthGuard()

    update(
        @Body() body: any,
    ) {
        return this.productRepository.update(body.id, body);
    }
}
