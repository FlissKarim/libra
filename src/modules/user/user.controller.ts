import {
  Body,
  Controller,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserAuthGuard } from '../auth/user-auth-guard';
import { User } from './entity/user';
import { UpdateUserRequestDto } from './dto/request/updateUser.dto';
import { MailService } from '../common/mail.service';
import { AbstractController } from '../common/abstract.controller';
import { EntityFilter } from '../common/entity.filter';
import { UserRepository } from './user.repository';

@ApiBearerAuth()
@ApiTags(`[/users] - User module`)
@Controller('users')
export class UserController extends AbstractController<User> {
  constructor(
    protected readonly UserRepository: UserRepository,
    protected readonly entityFilter: EntityFilter<User>,
    protected readonly mailService: MailService,
  ) {
    super(UserRepository, entityFilter);
  }

  @Put()
  @UserAuthGuard()
  public async update(
    @Req() { user },
    @Body() body: UpdateUserRequestDto,
  ): Promise<User> {
    return await this.UserRepository.update(user.id, body);
  }

  @Put("mail/configure")
  @UserAuthGuard()
  public async configureMail(
    @Req() { user },
    @Body() body: any,
  ): Promise<boolean> {
    return this.mailService.configure(user);
  }

  @Post("mail")
  @UserAuthGuard()
  public async sendMail(
    @Req() { user },
    @Body() body: any,
  ): Promise<void> {
    return this.mailService.send(user, body.mail);
  }
}
