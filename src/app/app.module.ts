import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {AngularFireModule} from '@angular/fire';
import {CoreModule} from './core/core.module';
import {environment} from '@environments/environment';
import {SecureInnerPagesGuard} from './core/guard/secure-inner-pages.guard';
import {AuthGuard} from './core/guard/auth.guard';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'auth',
        canActivate: [SecureInnerPagesGuard],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },

    {path: '**', pathMatch: 'full', redirectTo: ''},


];


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgHttpLoaderModule.forRoot(),
        AngularFireModule.initializeApp(environment.fireBase),
        CoreModule, // <-- add core module
        RouterModule.forRoot(routes),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
