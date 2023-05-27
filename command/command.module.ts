import { Module } from '@nestjs/common';
import { UserCommand } from './user-command';
import { CommonModule } from 'src/modules/common/common.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    exports: [UserCommand],
    providers: [UserCommand],
    imports: [CommonModule, UserModule],
})
export class CommandModule { }
