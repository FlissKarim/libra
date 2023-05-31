import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { User } from './entity/user';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/modules/common/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    protected connection: Connection,
  ) {
    super(repository, connection);
  }
}
