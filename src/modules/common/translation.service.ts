import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { TranslateOptions } from 'nestjs-i18n';

@Injectable()
export class TranslationService {

    constructor(private readonly i18n: I18nService) { }

    public translate(key: string, options?: TranslateOptions): string {
        return this.i18n.translate(key, options);
    }
}