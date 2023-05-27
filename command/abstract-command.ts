import { CommandRunner } from 'nest-commander';
import { Connection } from 'typeorm';
import * as ProgressBar from 'progress';
import { LoggerService } from 'src/modules/common/logger-service';

export interface BasicCommandOptions {
    progress?: void;
}

export abstract class AbstractCommand extends CommandRunner {
    constructor(
        protected readonly connection: Connection,
        protected readonly logger: LoggerService<any>
    ) {
        super();
    }

    async run(passedParam: string[], options: BasicCommandOptions): Promise<void> {
        try {
            await this.execute(passedParam, options);
            setTimeout(() => {
                this.exit(0);
            }, 0);
        } catch (error) {
            this.logger.fatal(error);
            this.exit(1);
        }
    }

    abstract execute: (passedParam: string[], options: BasicCommandOptions) => Promise<any>;

    exit(status: number) {
        let color: string;
        let message: string;
        switch (status) {
            case 0:
                color = "\u001b[1;32m";
                message = "✔ Succes";
                break;
            case 1:
                color = "\u001b[1;31m";
                message = "✘ Fail";
                break;
            default:
                color = "\u001b[1;33m";
                message = "🞩 Pass";
                break;
        }
        console.log(`${color} ${message}`);
        process.exit(status);
    }
}

export class Progress extends ProgressBar {
    static readonly _format: string = '[:bar] :rate/bps :percent :etas';
    constructor(total: number, step: string = '', format = Progress._format) {
        super(`${step}: ${format}`, { total })
    }
}