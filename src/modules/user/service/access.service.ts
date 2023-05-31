import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { Role, User } from 'src/modules/user/entity/user';

@Injectable()
export class AccessService {
  constructor(
    protected userService: UserService,
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
