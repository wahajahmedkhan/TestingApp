import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard.component';
import {NgbNavModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {UsersService} from '@services/endpoints/users.service';
import {FeedbackService} from '@services/endpoints/feedback.service';
import {BookingsService} from '@services/endpoints/bookings.service';


const routes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
    }

];


@NgModule({
    declarations: [AdminDashboardComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgbNavModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        UsersService,
        FeedbackService,
        BookingsService,
    ]
})
export class AdminDashboardModule {
}
