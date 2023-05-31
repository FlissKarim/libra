import { Identifiable } from "src/entity/base/identifiable";
import { Resource } from "src/modules/resource/entity/resource";
import { Column, Entity, JoinTable, ManyToOne } from "typeorm";


@Entity({ name: 'comments' })
export class Comment extends Identifiable {
  constructor(comment?: Partial<Comment>) {
    super();
    !!comment && Object.assign(this, comment);
  }

  @Column()
  public text: string;

  @ManyToOne(() => Resource, { nullable: true })
  @JoinTable()
  public createdBy: Resource;

}