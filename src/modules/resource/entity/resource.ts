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

  @Column({ unique: true })
  public email: string = null;

  @Column()
  public firstName: string = null;

  @Column()
  public lastName: string = null;

  @Column({ type: 'date' })
  public birthday: Date = null;

  @Column()
  public biography: string = null;

  @Column()
  public type: ResourceType = ResourceType.EMPLOYE;

  //@Column()
  public rights: string[] = [];

  @OneToOne(() => User, { nullable: true })
  @JoinTable()
  public user?: User = null;


}
