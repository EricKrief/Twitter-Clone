import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';

const authRoutes = [
    { path: 'login', component: LoginComponent, data: { animation: '2' } },
    { path: 'logout', redirectTo: '' },
    { path: 'register', component: RegisterComponent, data: { animation: '3' } },
];


@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {

}