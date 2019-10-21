import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

const layoutRoutes = [
    { path: '', component: HomeComponent, data: { animation: '1' } },
    { path: 'home', redirectTo: '' },
    { path: 'profile/:username', component: ProfileComponent, data: { animation: '4' } },
    { path: '**', component: PageNotFoundComponent, data: { animation: '5' } }
];

@NgModule({
    imports: [
        RouterModule.forChild(layoutRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule {

}