import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {RouterModule, Routes} from '@angular/router';
import {ForgotPasswordComponent} from '@auth/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from '@auth/verify-email/verify-email.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
    {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
    {path: 'sign-in', component: SignInComponent},
    {path: 'register-user', component: SignUpComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'verify-email-address', component: VerifyEmailComponent}
];


@NgModule({
    declarations: [
        AuthComponent,
        AdminLoginComponent,
        SignUpComponent,
        SignInComponent,
        ForgotPasswordComponent,
        VerifyEmailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class AuthModule {
}
