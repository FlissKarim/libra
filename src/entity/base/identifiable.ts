import { BaseEntity, PrimaryGeneratedColumn, } from 'typeorm';

export class Identifiable extends BaseEntity {

  @PrimaryGeneratedColumn()
  public readonly id: number;

}
