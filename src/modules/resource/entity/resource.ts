import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/entity/user';
import { Company } from '../../../entity/company';
import { Configuration } from '../../../entity/configuration';
import { Identifiable } from '../../../entity/base/identifiable';

export enum ResourceType {
  ADMIN,
  EMPLOYE,
  CUSTOMER,
  PARTNER,
  SUPPLIER,
  CONTACT
}

@Entity({ name: 'resources' })
export class Resource extends Identifiable {
  constructor() {
    super()
  }

  @Column({ unique: true })
  public email: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ type: 'date' })
  public birthday: Date;

  @Column()
  public biography: string;

  @Column()
  public type: ResourceType;

  public rights: string[] = [];

  @OneToOne(() => User, { nullable: true })
  @JoinTable()
  public user?: User;

  @ManyToMany(() => Company, { nullable: true })
  @JoinTable()
  public companies: Company[] = null;

  @OneToOne(type => Configuration, Configuration => Configuration.resource, { nullable: true })
  public configuration: Configuration;
}
