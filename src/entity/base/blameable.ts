import { JoinColumn, } from 'typeorm';
import { Resource } from '../resource';

export abstract class Blameable {
  constructor(blamable?: Partial<Blameable>) {
    !!blamable && Object.assign(this, blamable);
  }

  @JoinColumn()
  public readonly createdBy: Resource;
}
