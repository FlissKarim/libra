import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../user/entity/user";
import { Resource } from "../../resource/entity/resource";

@Entity({ name: 'transitions' })
export class Transition extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly code: string;

  @Column({ nullable: true })
  public role?: Role;

  @Column()
  public rights: string[] = [];

  @ManyToOne(() => Resource, { nullable: true })
  @JoinTable()
  public createdBy?: Resource;

}
