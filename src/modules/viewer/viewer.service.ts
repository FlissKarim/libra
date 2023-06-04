import { Injectable } from '@nestjs/common';
import { Viewable } from './viewable';
import * as pug from 'pug';
import { BlockType } from './entity/block';
import { TranslationService } from '../common/translation.service';

@Injectable()
export class ViewerService {

  constructor(private readonly translationService: TranslationService) { }

  public generateView(entity: Viewable) {
    const { template, model } = entity.getModelView();
    const mapping: { [t in BlockType]: { path: string } } = {
      header: { path: 'src/modules/viewer/block/header.pug' },
      signature: { path: 'src/modules/viewer/block/header.pug' },
      subject: { path: 'src/modules/viewer/block/header.pug' },
      table: { path: 'src/modules/viewer/block/header.pug' },
      footer: { path: 'src/modules/viewer/block/footer.pug' },
    };

    let renders: Record<BlockType, Function> = {} as any;
    Object.keys(mapping).forEach(block => {
      renders[block] = pug.compileFile(mapping[block].path);
    });

    const content: string[] = [];
    template.blocks.forEach(block => {
      const vars = model[block.type].data;
      Object.keys(model[block.type].translations).forEach(t => {
        vars[t] = this.translationService.translate(`viewer.${model[block.type].translations[t]}`);
      });
      content.push(renders[block.type](vars));
      console.log(content.join())
    });
  }
}