import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/base.repository';
import { BaseEntity } from 'typeorm';
import { Workflowable } from 'src/entity/base/workflowable';
import { Registry, TransitionRegistry } from 'src/modules/workflow/workflow.registry';
import { User } from 'src/modules/user/entity/user';
import { AccessService } from '../user/service/access.service';
import { Transition } from './entity/transition';
import { TransitionRepository } from './transition.repository';

@Injectable()
export class WorkflowService<T extends Workflowable & BaseEntity> {
    constructor(
        protected readonly repository: BaseRepository<T>,
        protected readonly accessService: AccessService,
        protected readonly transitionRepository: TransitionRepository,
    ) { }

    public can(entity: T, transition: TransitionRegistry): boolean {
        if (
            (transition in TransitionRegistry)
            && entity.constructor.name in Registry
        ) {
            return transition in Registry[entity.constructor.name].transitions;
        }
        return false;
    }

    public async apply(entity: T, transition: TransitionRegistry, user: User) {
        if (this.can(entity, transition)) {
            let granted: boolean = true;
            const t: Transition | null = await this.transitionRepository.findOneBy({ code: transition });
            if (t) {
                if (t.role && !this.accessService.hasRoles(user, [t.role])) {
                    granted = false;
                }
                if (t.rights.length && !this.accessService.hasRights(user, t.rights)) {
                    granted = false;
                }
            }
            const { to } = Registry[entity.constructor.name].transitions[transition];
            if (granted) {
                entity.status = to;
            } else {
                throw new Error(`Not enaugh rights to apply transition: "${transition}" to "${entity.constructor.name}"`);
            }
        } else {
            throw new Error(`Can't apply transition "${transition}" to "${entity.constructor.name}"`)
        }
    }
}