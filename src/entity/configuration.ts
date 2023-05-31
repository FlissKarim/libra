import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company';
import { Resource } from '../modules/resource/entity/resource';
import { Planning } from '../modules/management/entity/planning';
import { Identifiable } from './base/identifiable';


@Entity({ name: 'configurations' })
export class Configuration extends Identifiable {
  constructor(configuration?: Partial<Configuration>) {
    super();
    !!configuration && Object.assign(this, configuration);
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @OneToOne(type => Company, company => company.configuration, { nullable: true })
  public company: Company;

  @OneToOne(type => Resource, resource => resource.configuration, { nullable: true })
  public resource: Resource;

  @OneToOne(type => Planning, planning => planning.configuration, { nullable: true })
  public planning: Planning;
}
