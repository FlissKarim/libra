import { Column, Entity, OneToMany } from 'typeorm';
import { Identifiable } from '../../../entity/base/identifiable';
import { Block } from './block';

enum Availability {
    all,
    quote,
    invoice,
}

@Entity({ name: 'templates' })
export class Template extends Identifiable {

    @Column()
    public label: string = null;

    @Column({ default: Availability.all })
    public availability: Availability = Availability.all;

    @OneToMany(() => Block, (block) => block.template)
    public blocks: Block[] = [];
}
