
import { BaseEntity, SelectQueryBuilder } from 'typeorm';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { BaseRepository } from './base.repository';
import { LoggerService } from './logger.service';

type Format = 'csv';

export class ExportService {
    constructor(
        private readonly logger: LoggerService<string>,
    ) { }

    public async export<T extends BaseEntity>(
        repository: BaseRepository<T>,
        query: SelectQueryBuilder<T>,
        headers: { [label: string]: keyof T },
        callback: Function,
        filename: string = 'file',
        format: Format = 'csv'
    ) {
        const temp: string = `${randomUUID()}.${format}`;
        try {
            const stream = fs.createWriteStream(temp);
            stream.write(
                Object.keys(headers).join(',').concat('\n')
            );
            const fn = async (elements: T[], total: number) => {
                if (elements.length === 0) {
                    stream.end();
                    return;
                }
                const rows = elements.map(element => {
                    return Object.values(headers).map(field => {
                        return ExportService.transform(element[field])
                    });
                });
                stream.write(rows.map(row =>
                    row.join(',').concat('\n')).join()
                );
                callback(elements, total);
            };
            await repository.paginate(fn, query);
            fs.rename(temp, `${filename}.${format}`, () => { });
        } catch (e) {
            fs.unlink(temp, () => { });
            this.logger.error(e);
        }
    }


    public static transform(value: any): number | string {
        if (value instanceof Number) {
            return value as number;
        }
        if (value instanceof Date) {
            return value.toString();
        }
        return String(value);
    }
}