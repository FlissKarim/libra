import { BadRequestException, Injectable } from '@nestjs/common';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { SigninRequestDto } from '../dto/request/signin.dto';
import { SigninResponseDto } from '../dto/response/signin.dto';
import { crypt } from 'src/utils';
import { UserRepository } from 'src/modules/user/user.repository';

const JWT_SECRET: string = config.get('jwt.jwt_secret');
const SALT: string = config.get('account.salt');

@Injectable()
export class SigninService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async singin({ email, password }: SigninRequestDto): Promise<SigninResponseDto> {
    try {
      const cryptedPassword = crypt(password, SALT);
      const user = await this.userRepository.findOneBy({ email, password: cryptedPassword });
      if (!user) {
        throw new BadRequestException({ EN: 'Incorrect login or password' });
      }

      return {
        id: user.id,
        token: jwt.sign({ id: user.id }, JWT_SECRET),
      };
    } catch (e) {
      throw new BadRequestException({ EN: 'Incorrect login or password' });
    }
  }
}
