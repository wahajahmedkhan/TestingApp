import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <!--<ng-http-loader-->
        <!--[backdrop]="false"-->
        <!--[backgroundColor]="'#ff0000'"-->
        <!--[debounceDelay]="100"-->
        <!--[extraDuration]="300"-->
        <!--[minDuration]="300"-->
        <!--[opacity]=".6"-->
        <!--spinner="sk-wave">-->
        <!--</ng-http-loader>-->
        <router-outlet></router-outlet>`
})
export class AppComponent {

}
