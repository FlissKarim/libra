import { Aggregation, Aggregations, Operator, Operators, Property } from "src/entity/base/filtrable";
import { BaseEntity, SelectQueryBuilder } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base-repository";

export type Filter<T> = {
    strategy: 'or' | 'and',
    itemsPerPage?: number,
    page?: number,
}
const itemsPerPage = 200;

@Injectable()
export class EntityFilter<T extends BaseEntity> {
    public async fetch(filters: Property<T> & Filter<T>, repository: BaseRepository<T>): Promise<any[] | T[]> {
        try {
            this.setDefault(filters);
            let { strategy, itemsPerPage, page, ...reste } = filters;
            const fields: Property<T> = reste as any;
            const { isFilter, isAggregation } = this.validate(fields);
            if (isAggregation) {
                return await this.aggregate(filters, repository);
            } else if (isFilter) {
                return await this.filter(filters, repository);
            }
        } catch (error) {
            throw error;
        }
        return [];
    }

    private async filter(filters: Property<T> & Filter<T>, repository: BaseRepository<T>): Promise<T[]> {
        const qb = await this.buildQuery(filters, repository);
        let { strategy, itemsPerPage, page, ...reste } = filters;
        if (page) {
            qb.offset(page * itemsPerPage);
        }
        qb.limit(itemsPerPage);
        return qb.getMany();
    }

    private async aggregate(filters: Property<T> & Filter<T>, repository: BaseRepository<T>): Promise<any[]> {
        const qb = await this.buildQuery(filters, repository);
        let { strategy, itemsPerPage, page, ...reste } = filters;
        const fields: Property<T> = reste as any;
        Object.keys(fields).forEach(field => {
            this.buildGroupBy(qb, field, fields[field]);
        });
        let records = await qb.getRawMany();
        records.forEach(record => {
            Object.keys(record).forEach(k => {
                if (k.startsWith(qb.alias)) {
                    delete record[k];
                }
            });
        });

        return records;
    }

    private async buildQuery(filters, repository: BaseRepository<T>):
        Promise<SelectQueryBuilder<T>> {
        let { strategy, itemsPerPage, page, ...reste } = filters;
        const fields: Property<T> = reste as any;
        const qb = repository.getQuery();
        const whereFn = (cnd) => strategy === 'and' ? qb.andWhere(cnd) : qb.orWhere(cnd);
        Object.keys(fields).forEach(field => {
            const target = `${qb.alias}.${field}`;
            if (repository.isRelation(field)) {
                qb.leftJoin(target, field)
            } else if (repository.isColumn(field)) {
                const cnd = this.buildCondition(target, fields[field]);
                cnd && whereFn(cnd);
            } else {
                throw Error("Unkown property.");
            }

        });
        return qb;
    }

    private buildCondition(field: string, operators: Operators): string {
        const conditions = [];
        if ([1, 'true', true].includes(operators.exists) || ['null', null].includes(operators.not)) {
            conditions.push(`${field} is NOT NULL`);
        } else if ([0, 'false', false].includes(operators.exists)) {
            conditions.push(`${field} is NULL`);
        } else if (operators.not) {
            if (Array.isArray(operators.not)) {
                conditions.push(`${field} NOT IN (${operators.not.join(',')})`);
            } else {
                conditions.push(`${field} <> ${operators.not}`);
            }
        }
        if (operators.eq) {
            if (Array.isArray(operators.eq)) {
                conditions.push(`${field} IN (${operators.eq.join(',')})`);
            } else {
                conditions.push(`${field} = ${operators.eq}`);
            }
        }
        if (operators.lte || operators.gte) {
            if (operators.lte) {
                conditions.push(`${field} <= ${operators.lte}`);
            }
            if (operators.gte) {
                conditions.push(`${field} >= ${operators.gte}`);
            }
        } else if (operators.before || operators.after) {
            if (operators.before) {
                conditions.push(`${field} < ${operators.before}`);
            }
            if (operators.after) {
                conditions.push(`${field} > ${operators.after}`);
            }
        }
        return conditions.join(' and ');
    }

    private buildGroupBy(qb: SelectQueryBuilder<T>, field: string, aggregation: Aggregations): void {
        const alias = field.replace('.', '_').toLowerCase();
        const target = `${qb.alias}.${field}`;
        if (aggregation.count !== undefined) {
            qb.addSelect(`COUNT(${target}) as ${alias}_count`);
            qb.addGroupBy(target);
        }
        if (aggregation.sum !== undefined) {
            qb.addSelect(`SUM(${target}) as ${alias}_sum`);
            qb.addGroupBy(target);
        }
        if (aggregation.avg !== undefined) {
            qb.addSelect(`AVG(${target}) as ${alias}_avg`);
            qb.addGroupBy(target);
        }
    }

    private validate(filter: Property<T>): { isFilter: boolean, isAggregation: boolean } {
        const operators = Object.keys(Operator);
        const aggregations = Object.keys(Aggregation);
        let isFilter = true;
        let isAggregation = false;
        Object.values(filter).forEach(f => {
            Object.keys(f).forEach(e => {
                if (operators.includes(e)) {
                    isFilter = true;
                } else if (aggregations.includes(e)) {
                    isAggregation = true;
                } else {
                    throw Error(`The filtering query is not correct.`);
                }
            });
        });
        return { isFilter, isAggregation };
    }

    private setDefault(filters: Property<T> & Filter<T>): void {
        if (!filters.itemsPerPage) {
            filters.itemsPerPage = itemsPerPage;
        }
    }
}