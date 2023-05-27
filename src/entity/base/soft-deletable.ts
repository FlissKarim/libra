import { DeleteDateColumn } from 'typeorm';

export abstract class SoftDeletable {

  @DeleteDateColumn({ select: false })
  public readonly deletedAt: Date;
}
