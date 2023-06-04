import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { BaseRepository } from '../common/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(
        @InjectRepository(Product) repository: Repository<Product>,
        protected connection: Connection,
    ) {
        super(repository, connection);
    }
}