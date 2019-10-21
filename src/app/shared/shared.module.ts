import { NgModule } from '@angular/core';
import { TranslationPipe } from './pipes/translation.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TranslationPipe
    ],
    exports: [
        TranslationPipe,
        FormsModule
    ]
})
export class SharedModule {

}