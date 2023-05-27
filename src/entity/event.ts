import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resource } from './resource';
import { Invitation } from './invitation';
import { Planning } from './planning';
import { SoftDeletable } from './base/soft-deletable';
import { Blameable } from './base/blameable';
import { Timestampable } from './base/timestampable';
import { Identifiable } from './base/identifiable';


@Entity({ name: 'events' })
export class Event extends Identifiable {
  constructor(event?: Partial<Event>) {
    super();
    !!event && Object.assign(this, event);
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public label: string;

  @Column()
  public description: string;

  @Column({ type: 'date' })
  public start: Date;

  @Column({ type: 'date' })
  public end: Date;

  @JoinColumn()
  public readonly createdBy: Resource;

  @ManyToOne(() => Planning, planning => planning.events)
  public readonly planning: Planning;

  @ManyToMany(() => Resource)
  @JoinTable()
  public readonly persons: Resource[];

  @OneToMany(type => Invitation, invitation => invitation.event)
  public readonly invitations: Invitation[];

}
