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
  public label: string;

  @Column()
  public description: string;

  @Column({ default: Priority.medium })
  public priority: Priority;

  @JoinTable()
  public comments: Comment[] = [];

  @ManyToOne(() => Resource, { nullable: true })
  @JoinTable()
  public createdBy: Resource;

}