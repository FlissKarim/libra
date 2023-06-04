import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { BrockerModule } from '../broker/broker.module';
import { MailService } from './mail.service';
import { LoggerService } from './logger.service';
import { EntityFilter } from './entity.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user';
import { UserRepository } from '../user/user.repository';
import { TranslationService } from './translation.service';

@Module({
    exports: [
        ExportService,
        MailService,
        LoggerService,
        EntityFilter,
        TranslationService,
    ],
    providers: [
        ExportService,
        MailService,
        LoggerService,
        EntityFilter,
        UserRepository,
        TranslationService,
    ],
    imports: [
        BrockerModule,
        TypeOrmModule.forFeature([User]),
    ],
})
export class CommonModule { }
