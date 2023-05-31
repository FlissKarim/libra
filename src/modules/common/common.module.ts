import { Module } from '@nestjs/common';
import { ExportService } from './export-service';
import { BrockerModule } from '../broker/broker.module';
import { MailService } from './mail-service';
import { LoggerService } from './logger-service';
import { EntityFilter } from './entity-filter';
import { UserService } from '../user/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user';

@Module({
    exports: [
        ExportService,
        MailService,
        LoggerService,
        EntityFilter,
    ],
    providers: [
        ExportService,
        MailService,
        LoggerService,
        EntityFilter,
        UserService,
    ],
    imports: [BrockerModule, TypeOrmModule.forFeature([User])],
})
export class CommonModule { }
