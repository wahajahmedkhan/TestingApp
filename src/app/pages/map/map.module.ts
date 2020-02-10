import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModalModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '@shared/toast/toast-service';
import {ToastsContainer} from '@shared/toast/toasts-container';
import {AreasService} from '@services/endpoints/areas.service';


const routes: Routes = [
    {
        path: '',
        component: MapComponent,
    }

];


@NgModule({
    declarations: [MapComponent, ToastsContainer],
    imports: [
        CommonModule,
        NgbToastModule,
        NgbModalModule,
        RouterModule.forChild(routes)
    ],
    providers: [ToastService, AreasService],
})
export class MapModule {
}
