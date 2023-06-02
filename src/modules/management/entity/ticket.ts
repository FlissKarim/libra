import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { Resource } from "../../resource/entity/resource";
import { Workflowable } from "../../../entity/base/workflowable";
import { Identifiable } from "../../../entity/base/identifiable";

export enum Priority {
  low,
  medium,
  high,
}

@Entity({ name: 'tickets' })
export class Ticket extends Identifiable {
  constructor(ticket?: Partial<Ticket>) {
    super();
    !!ticket && Object.assign(this, ticket);
  }

  @Column()
  public label: string = null;

  @Column()
  public description: string = null;

  @Column({ default: Priority.medium })
  public priority: Priority = Priority.medium;

  @JoinTable()
  public comments: Comment[] = [];

  @ManyToOne(() => Resource, { nullable: true })
  @JoinTable()
  public createdBy: Resource;

}