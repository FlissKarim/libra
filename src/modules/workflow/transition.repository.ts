import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { BaseRepository } from '../common/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Transition } from './entity/transition';

@Injectable()
export class TransitionRepository extends BaseRepository<Transition> {
    constructor(
        @InjectRepository(Transition) repository: Repository<Transition>,
        protected connection: Connection,
    ) {
        super(repository, connection);
    }
}