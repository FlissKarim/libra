import { Injectable } from '@nestjs/common';
import { Resource } from 'src/modules/resource/entity/resource';
import { Connection, Repository } from 'typeorm';
import { BaseRepository } from '../common/base-repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResourceRepository extends BaseRepository<Resource> {
    constructor(
        @InjectRepository(Resource) repository: Repository<Resource>,
        protected connection: Connection,
    ) {
        super(repository, connection);
    }
}