import { Body, Controller, Put } from '@nestjs/common';
import { AbstractController } from '../common/abstract.controller';
import { Resource } from 'src/modules/resource/entity/resource';
import { UserAuthGuard } from '../auth/user-auth-guard';
import { ResourceRepository } from './resource.service';
import { EntityFilter } from '../common/entity-filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags(`[/resources] - Resource module`)
@Controller('resource')
export class ResourceController extends AbstractController<Resource> {
    constructor(
        protected readonly resourceRepository: ResourceRepository,
        protected readonly entityFilter: EntityFilter<Resource>
    ) {
        super(resourceRepository, entityFilter);
    }
    @Put()
    @UserAuthGuard()

    update(
        @Body() body: any,
    ) {
        return this.resourceRepository.update(body.id, body);
    }
}
