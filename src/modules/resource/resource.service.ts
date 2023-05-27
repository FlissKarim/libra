import { Injectable } from '@nestjs/common';
import { Resource } from 'src/entity/resource';
import { Connection, Repository } from 'typeorm';
import { BaseRepository } from '../common/base-repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResourceService extends BaseRepository<Resource> {
    constructor(
        @InjectRepository(Resource) repository: Repository<Resource>,
        protected connection: Connection,
    ) {
        super(repository, connection);
    }
}