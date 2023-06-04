import {
    Column,
    Entity,
    JoinColumn,
} from 'typeorm';
import { Identifiable } from '../../../entity/base/identifiable';
import { Viewable } from 'src/modules/viewer/viewable';
import { Template } from 'src/modules/viewer/entity/template';
import { ModelView } from 'src/modules/viewer/model-view';
import { Block, BlockType } from 'src/modules/viewer/entity/block';
import { Resource } from 'src/modules/resource/entity/resource';

@Entity({ name: 'quotes' })
export class Quote extends Identifiable implements Viewable {
    constructor(quote?: Partial<Quote>) {
        super();
        !!quote && Object.assign(this, quote);
    }

    @Column()
    public number: string = null;

    @Column()
    public label: string = null;

    @Column()
    @JoinColumn()
    public readonly createdBy: Resource;

    @Column()
    @JoinColumn()
    public readonly template: Template;

    getModelView(): { template: Template, model: ModelView } {
        let template = new Template();
        let block = new Block();
        block.type = BlockType.header;
        template.blocks.push(block);
        let model = new ModelView();
        model.header = { data: { label: 'karim', logo: 'logo.img' }, translations: { trans_field: 'HELLO' } }
        return { template, model };
    }
}
