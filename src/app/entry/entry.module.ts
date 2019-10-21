import { NgModule } from '@angular/core';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ReplyComponent } from './reply/reply.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [
        ConfirmationComponent,
        ReplyComponent
    ],

    imports: [
        CommonModule,
        SharedModule,
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [ReplyComponent, ConfirmationComponent],
})
export class EntryModule {

}