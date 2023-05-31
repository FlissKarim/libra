import { Injectable } from '@nestjs/common';
import { Role, User } from 'src/modules/user/entity/user';
import { UserRepository } from '../user.repository';

@Injectable()
export class AccessService {
  constructor(
    protected userRepository: UserRepository,
  ) { }

  public async isSuperAdmin(): Promise<boolean> {
    return false;
  }

  public async hasRoles(user: User, roles: Role[]): Promise<boolean> {
    return false;
  }

  public async hasRights(user: User, rights: string[]): Promise<boolean> {
    return false;
  }
}
