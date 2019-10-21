import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { PostService } from './services/post.service';
import { TranslationService } from './services/translation.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './utils/auth-interceptor';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        DataService,
        PostService,
        TranslationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error('Core module already created!');
        }
    }
}