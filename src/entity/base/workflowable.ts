import { BaseEntity, Column } from 'typeorm';
import { Status } from '../../modules/workflow/workflow-registry';

export abstract class Workflowable extends BaseEntity {
  constructor(workflow?: Partial<Workflowable>) {
    super();
    !!workflow && Object.assign(this, workflow);
  }

  @Column()
  public status: Status;
}
