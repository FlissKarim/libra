
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entity/user';
import { LoggerService } from './logger-service';

interface Transport {
    host: string,
    port: number,
    auth: { user: string, pass: string }
}

@Injectable()
export class MailService {
    constructor(
        protected readonly logger: LoggerService<any>,
    ) { }

    async send(user: User, mail: Mail.Options) {
        const config: Transport = null;
        const transport = nodemailer.createTransport(config);
        transport.sendMail(mail, (error) => {
            this.logger.error(error);
        });
    }

    async configure(user: User): Promise<boolean> {
        return true;
    }
}