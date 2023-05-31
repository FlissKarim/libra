import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event';
import { Company } from '../../../entity/company';
import { Configuration } from '../../../entity/configuration';
import { Identifiable } from '../../../entity/base/identifiable';
import { Resource } from '../../resource/entity/resource';


@Entity({ name: 'plannings' })
export class Planning extends Identifiable {
  constructor(planning?: Partial<Planning>) {
    super();
    !!planning && Object.assign(this, planning);
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public label: string;

  @Column()
  public description: string;

  @DeleteDateColumn({ select: false })
  public readonly deletedAt: Date;

  @JoinColumn()
  public readonly createdBy: Resource;

  @OneToMany(type => Event, event => event.planning)
  public readonly events: Event[];

  @ManyToMany(() => Company, { nullable: true })
  @JoinTable()
  public companies: Company[] = null;

  @OneToOne(type => Configuration, Configuration => Configuration.planning, { nullable: true })
  public configuration: Configuration;
}
