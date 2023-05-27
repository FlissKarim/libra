import { Column, JoinColumn } from 'typeorm';
import { Resource } from '../resource';

export abstract class Lockable {
  constructor(lockable?: Partial<Lockable>) {
    !!lockable && Object.assign(this, lockable);
  }

  @Column({ default: false })
  public locked = false;

  @JoinColumn()
  public readonly lockedBy: Resource;
}
