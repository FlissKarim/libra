import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { User } from '../../../entity/user';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/modules/common/base-repository';

@Injectable()
export class UserService extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    protected connection: Connection,
  ) {
    super(repository, connection);
  }

  public async getUser(id: number): Promise<User> {
    try {
      const user = this.findById(id);
      if (!user) {
        throw new NotFoundException({ EN: 'User is not found' });
      }

      return user;
    } catch (e) {
      throw new BadRequestException({ EN: 'Error getting user data' });
    }
  }
}
