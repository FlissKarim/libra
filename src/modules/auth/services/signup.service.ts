import { BadRequestException, Injectable } from '@nestjs/common';
import * as config from 'config';
import { User } from 'src/modules/user/entity/user';
import { Connection } from 'typeorm';
import { SignupRequestDto } from '../dto/request/signup.dto';
import { SignupResponseDto } from '../dto/response/signup.dto';
import { crypt } from 'src/utils';
import { UserService } from 'src/modules/user/service/user.service';

const SALT: string = config.get('account.salt');

@Injectable()
export class SignupService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    private readonly userService: UserService,
  ) { }

  public async signup(data: SignupRequestDto): Promise<SignupResponseDto> {
    try {
      const { email, password } = data;

      const user = await this.userService.findOneBy({ email: email });

      if (user) {
        throw new BadRequestException({ EN: 'User with this email already exist' });
      }

      const registeredUser = new User({
        ...data,
        password: crypt(password, SALT),
      });

      await this.entityManager.save(registeredUser);

      return {
        userId: registeredUser.id,
      };
    } catch (e) {
      throw new BadRequestException({ EN: 'Signup error' });
    }
  }
}
