import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { crypt } from 'src/utils';
import { UserRepository } from '../user/user.repository';

const SALT: string = config.get('account.salt');

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  public async validateUser(name: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: name });
    const cryptedPassword = crypt(password, SALT);

    if (user && user.password === cryptedPassword) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
