import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PostsModule } from '../posts/posts.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        MenuComponent,
        MenuItemComponent,
        PageNotFoundComponent,
        ProfileComponent,
        HomeComponent
    ],
    imports: [
        LayoutRoutingModule,
        SharedModule,
        CommonModule,
        PostsModule
    ],
    exports: [
        MenuComponent
    ]
})
export class LayoutModule {

}