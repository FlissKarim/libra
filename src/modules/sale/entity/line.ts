import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
} from 'typeorm';
import { Identifiable } from '../../../entity/base/identifiable';
import { Vat } from 'src/modules/product/entity/vat';

@Entity({ name: 'lines' })
export class Line extends Identifiable {
    constructor(line?: Partial<Line>) {
        super();
        !!line && Object.assign(this, line);
    }

    @Column()
    public label: string = null;

    @Column({ nullable: true })
    public description: string = null;

    @Column({ type: 'bigint' })
    public price: string = null;

    @Column({ type: 'bigint' })
    public tax: string = null;

    @Column({ type: 'bigint' })
    public discount: string = null;

    @ManyToOne(() => Vat)
    @JoinTable()
    public vat: Vat;
}
