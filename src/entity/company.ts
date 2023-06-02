import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Configuration } from './configuration';
import { Identifiable } from './base/identifiable';
import { Resource } from '../modules/resource/entity/resource';


@Entity({ name: 'companies' })
export class Company extends Identifiable {
  constructor(company?: Partial<Company>) {
    super();
    !!company && Object.assign(this, company);
  }

  @Column()
  public label: string;

  @Column()
  public logo: string;

  @JoinColumn()
  public readonly createdBy: Resource;

}
