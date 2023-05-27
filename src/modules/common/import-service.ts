
import { BaseEntity } from 'typeorm';
import * as fs from 'fs';
import * as readline from 'readline';
import { Logger } from 'tslog';
import { ImportProducer } from '../broker/import.producer';
import { BaseRepository } from './base-repository';
import { parseCSV } from 'src/utils';

export class ImportService {
    constructor(
        private readonly logger: Logger<string>,
        private readonly importProducer: ImportProducer,
    ) { }

    public async import<T extends BaseEntity>(
        mapping: { [column: number]: keyof T },
        filepath: string,
        model: T,
        repository: BaseRepository<T>,
    ) {
        try {
            const file = readline.createInterface({
                input: fs.createReadStream(filepath),
                crlfDelay: Infinity
            });
            file.on('line', (line) => {
                const values = parseCSV(line)[0];
                this.importProducer.publish(repository.creator(values, mapping, model));
            });
        } catch (error) {
            this.logger.error(error);
        }
    }
}