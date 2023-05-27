import { Body, Delete, Get, HttpStatus, Param, ParseIntPipe, Query, Req } from '@nestjs/common';
import { BaseRepository } from './base-repository';
import { BaseEntity } from 'typeorm';
import { EntityFilter, Filter } from './entity-filter';
import { UserAuthGuard } from '../auth/user-auth-guard';
import { Property } from 'src/entity/base/filtrable';

export abstract class AbstractController<T extends BaseEntity> {
  constructor(
    protected readonly repository: BaseRepository<T>,
    protected readonly entityFilter: EntityFilter<T>,
  ) { }

  /**
  * Example of url parameters col[gte]=10&col[lte]=100&col[eq]=1&col[eq]=2&strategy=or
  */
  @Get()
  @UserAuthGuard()
  getCollection(@Query() query: Property<T> & Filter<T>) {
    return this.entityFilter.fetch(query, this.repository);
  }

  @Get(':id')
  @UserAuthGuard()
  getItem(
    @Param('id', new ParseIntPipe()) id: number) {
    return this.repository.findById(id);
  }

  @Delete(':id')
  @UserAuthGuard()
  public async deleteUserById(@Param('id', new ParseIntPipe()) id: number): Promise<HttpStatus> {
    await this.repository.delete(id);
    return HttpStatus.OK;
  }
}
