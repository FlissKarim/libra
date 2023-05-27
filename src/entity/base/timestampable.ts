import { CreateDateColumn, UpdateDateColumn, } from 'typeorm';

export abstract class Timestampable {

  @CreateDateColumn({ select: false })
  public readonly createdAt: Date;

  @UpdateDateColumn({ select: false })
  public readonly updatedAt: Date;
}
