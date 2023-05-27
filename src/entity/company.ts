import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Configuration } from './configuration';
import { SoftDeletable } from './base/soft-deletable';
import { Blameable } from './base/blameable';
import { Timestampable } from './base/timestampable';
import { Identifiable } from './base/identifiable';
import { Resource } from './resource';


@Entity({ name: 'companies' })
export class Company extends Identifiable {
  constructor(company?: Partial<Company>) {
    super();
    !!company && Object.assign(this, company);
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public label: string;

  @Column()
  public logo: string;

  @JoinColumn()
  public readonly createdBy: Resource;

  @OneToOne(type => Configuration, Configuration => Configuration.company, { nullable: true })
  public configuration: Configuration;
}
