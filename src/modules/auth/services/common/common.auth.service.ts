import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { User } from 'src/entity/user';
import { Connection } from 'typeorm';

@Injectable()
export class CommonAuthService {

  constructor(
    private readonly connection: Connection,
  ) { }

  public cryptPassword(password: string, salt: string): string {
    return crypto
      .createHmac('sha512', salt)
      .update(password)
      .digest('hex');
  }



  public getUserByEmail(email: string) {
    return this.connection.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
