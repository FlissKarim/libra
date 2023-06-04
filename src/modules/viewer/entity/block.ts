import { Column, Entity, OneToOne } from 'typeorm';
import { Identifiable } from '../../../entity/base/identifiable';
import { Template } from './template';

enum Color {
    white = '#FFFFFF',
    black = '#000000',
}

enum Align {
    left,
    center,
    right,
}

export enum BlockType {
    header = 'header',
    signature = 'signature',
    subject = 'subject',
    table = 'table',
    footer = 'footer',
}

enum Size {
    full,
    half
}

@Entity({ name: 'blocks' })
export class Block extends Identifiable {

    @Column()
    public label: string = null;

    @Column({ default: BlockType.header })
    public type: BlockType = BlockType.header;

    @Column({ default: Align.center })
    public align: Align = Align.center;

    @Column({ default: Size.full })
    public size: Size = Size.full;

    @Column({ default: 10 })
    public textSize: number = 10;

    @Column({ default: 12 })
    public sectionTextSize: number = 12;

    @Column({ default: 14 })
    public headerTextSize: number = 14;

    @Column({ default: Color.white })
    public textColor: string = Color.white;

    @Column({ default: Color.black })
    public background: string = Color.black;

    @OneToOne(() => Template)
    public template: Template = null;

}
