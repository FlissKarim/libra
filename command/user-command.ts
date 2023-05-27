import { Command } from 'nest-commander';
import { Connection } from 'typeorm';
import { AbstractCommand, BasicCommandOptions, Progress } from './abstract-command';
import { UserService } from 'src/modules/user/service/user.service';
import { ExportService } from 'src/modules/common/export-service';
import { User } from 'src/entity/user';
import { LoggerService } from 'src/modules/common/logger-service';

@Command({
    name: 'users',
})
export class UserCommand extends AbstractCommand {
    constructor(
        protected readonly connection: Connection,
        protected readonly userService: UserService,
        protected readonly exportService: ExportService,
        protected readonly logger: LoggerService<any>,
    ) {
        super(connection, logger)
    }

    execute = async (passedParam: string[], options: BasicCommandOptions): Promise<any> => {
        const headers: { [label: string]: any } = { 'Id': 'id', 'Email': 'email' };
        let progress;
        const tracker = (elements: User[], total: number) => {
            if (!progress) {
                progress = new Progress(total, 'exporting');
            }
            if (elements.length === 0) {
                progress.terminate();
            } else {
                progress.tick(elements.length);
            }
        }
        await this.exportService.export<User>(
            this.userService,
            this.userService.getQuery(),
            headers,
            tracker
        );
    }
}