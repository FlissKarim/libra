
import { isWritable } from 'src/utils';
import { BaseEntity, Connection, FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';

export abstract class BaseRepository<T extends BaseEntity>
{
    constructor(protected readonly repository: Repository<T>,
        protected readonly connection: Connection,
    ) { }

    public creator<T>(values: any[], mapping: { [column: number]: keyof T }, base: T): T {
        Object.keys(mapping).forEach(column => {
            let value: any = values[column] as never;
            let field: keyof T = mapping[column];
            if (isWritable(base, field)) {
                const type = Reflect.getMetadata("design:type", base, field as any);
                if (type === Number) {
                    value = Number(value);
                } if (type === Boolean) {
                    value = Boolean(value);
                } else if (type === Date) {
                    value = new Date(value);
                }
                base[field as any] = value;
            }
        });
        return base;
    }

    async count(): Promise<number> {
        return this.repository.count();
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: any): Promise<T | null> {
        return await this.repository.findOneBy(id);
    }

    async findOneBy(field: FindOptionsWhere<T>): Promise<T | null> {
        return await this.repository.findOneBy(field);
    }

    async create(data: any): Promise<T> {
        const entity = this.repository.create(data) as any;
        return await this.repository.save(entity);
    }

    async update(id: number, data: Partial<unknown>): Promise<T> {
        await this.repository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    public getQuery(): SelectQueryBuilder<T> {
        return this.repository.createQueryBuilder();
    }

    public async paginate(
        fn: (elements: T[], total: number) => Promise<any>,
        query: SelectQueryBuilder<T>,
        page = 200,
    ): Promise<any> {
        try {
            const total = await query.getCount();
            const iterations = Math.ceil(total / page);
            for (let i = 0; i < iterations; i++) {
                const result: T[] = await query
                    .offset(i * page)
                    .limit(page)
                    .getMany();
                await fn(result, total);
            }
            await fn([], total);
        } catch (e) {
            console.log(e);
        }
    }

    public isRelation(propertyName: string): boolean {
        return this.repository.metadata.relationsWithJoinColumns.some(r => r.propertyName === propertyName);
    }

    public isColumn(propertyName: string): boolean {
        return this.repository.metadata.ownColumns.some(r => r.propertyName === propertyName);
    }
}