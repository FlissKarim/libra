import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { crypt } from 'src/utils';
import { UserService } from '../user/service/user.service';

const SALT: string = config.get('account.salt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) { }

  public async validateUser(name: string, password: string) {
    const user = await this.userService.findOneBy({ email: name });
    const cryptedPassword = crypt(password, SALT);

    if (user && user.password === cryptedPassword) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
