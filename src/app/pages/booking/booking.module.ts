import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingComponent} from './booking.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbDatepickerModule, NgbPaginationModule, NgbTimepickerModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
    {
        path: '',
        component: BookingComponent,
    }

];

@NgModule({
    declarations: [BookingComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgbTimepickerModule,
        NgbDatepickerModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        RouterModule.forChild(routes)

    ]
})
export class BookingModule {
}
