import {Component} from '@angular/core';
import {AuthService} from '@services/common/auth.service';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
})
export class PagesComponent {

    constructor(public auth: AuthService) {

    }


}
