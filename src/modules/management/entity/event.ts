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
import { Invitation } from './invitation';
import { Planning } from './planning';
import { Identifiable } from 'src/entity/base/identifiable';
import { Resource } from 'src/modules/resource/entity/resource';


@Entity({ name: 'events' })
export class Event extends Identifiable {
  constructor(event?: Partial<Event>) {
    super();
    !!event && Object.assign(this, event);
  }

  @Column()
  public label: string = null;

  @Column()
  public description: string = null;

  @Column({ type: 'date' })
  public start: Date = null;

  @Column({ type: 'date' })
  public end: Date = null;

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
