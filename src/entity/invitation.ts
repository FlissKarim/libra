import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event';
import { Identifiable } from './base/identifiable';
import { Resource } from './resource';


@Entity({ name: 'invitations' })
export class Invitation extends Identifiable {

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public label: string;

  @Column()
  public description: string;

  @JoinColumn()
  public readonly createdBy: Resource;

  @ManyToOne(type => Event, { onDelete: 'CASCADE' })
  public readonly event: Event;
}
