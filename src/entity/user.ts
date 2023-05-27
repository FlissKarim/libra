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
import { Resource } from './resource';
import { Lockable } from './base/lockable';
import { Identifiable } from './base/identifiable';

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
  public email: string;

  @Column()
  public password: string;

  @Column({ default: Role.USER })
  public role: Role = Role.USER;

  @ManyToOne(() => Resource, { nullable: true })
  @JoinTable()
  public resource?: Resource;

}
