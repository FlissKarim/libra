import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Resource } from '../../resource/entity/resource';
import { Lockable } from '../../../entity/base/lockable';
import { Identifiable } from '../../../entity/base/identifiable';

export enum Role {
  SUPERADMIN,
  ADMIN,
  USER,
}

@Entity({ name: 'users' })
@Unique(['email'])
@Index(['email', 'password'])
export class User extends Identifiable {
  constructor(user?: Partial<User>) {
    super();
    !!user && Object.assign(this, user);
  }
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public email: string = null;

  @Column()
  public password: string = null;

  @Column({ default: Role.USER })
  public role: Role = Role.USER;

  @ManyToOne(() => Resource, { nullable: true })
  @JoinTable()
  public resource?: Resource = null;

}
