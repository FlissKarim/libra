import {
    Column,
    Entity,
} from 'typeorm';
import { Identifiable } from '../../../entity/base/identifiable';

@Entity({ name: 'vats' })
export class Vat extends Identifiable {
    @Column()
    public label: string = null;

    @Column()
    public description: string = null;

    @Column()
    public percent: number = null;
}
