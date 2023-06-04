import {
    Column,
    Entity,
} from 'typeorm';
import { Identifiable } from '../../../entity/base/identifiable';

@Entity({ name: 'products' })
export class Product extends Identifiable {

    @Column()
    public label: string = null;

    @Column()
    public description: string = null;

    @Column({ type: 'bigint' })
    public price: string = null;

    @Column({ type: 'bigint' })
    public cost: string = null;
}
