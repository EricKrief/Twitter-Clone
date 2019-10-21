import { PipeTransform, Pipe } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';


@Pipe({
    name: 'translate',
})
export class TranslationPipe implements PipeTransform {

    constructor(private translationService: TranslationService) { }

    transform(value: string, transformTo: string) {
        return this.translationService.getTranslatedWord(value, transformTo);
    }
}