
import { BaseEntity } from 'typeorm';
import * as fs from 'fs';
import * as readline from 'readline';
import { ImportProducer } from '../broker/import.producer';
import { BaseRepository } from './base.repository';
import { parseCSV } from 'src/utils';
import { ImportMessage } from '../broker/import.consumer';
import { LoggerService } from './logger.service';
import { Injectable } from '@nestjs/common';

export interface ImportConfiguration {
    indexes: { header: number, body: number };
}

@Injectable()
export class ImportService<T extends BaseEntity> {
    constructor(
        private readonly logger: LoggerService<string>,
        private readonly importProducer: ImportProducer<T, ImportMessage>,
    ) { }

    public async import(
        mapping: { [column: number]: keyof T },
        filepath: string,
        repository: BaseRepository<T>,
        config: ImportConfiguration,
    ) {
        try {
            this.importProducer.setEntityRepository(repository);
            const counter = ((i = 0) => () => ++i)();
            const file = readline.createInterface({
                input: fs.createReadStream(filepath),
                crlfDelay: Infinity
            });
            file.on('line', (line, index = counter()) => {
                const values = parseCSV(line)[0];
                if (config.indexes.body > index) {
                    return;
                }
                this.importProducer.publish({
                    columns: values,
                    headers: mapping as any,
                    target: repository.targetName(),
                });
            });
        } catch (error) {
            console.log(error);
            this.logger.error(error);
        }
    }
}