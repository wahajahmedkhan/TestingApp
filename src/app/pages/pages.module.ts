import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './page.component';
import { NgbCollapseModule, NgbDropdownModule, NgbNav, NgbNavModule } from '@nodeMod/@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'main' },
      {
        path: 'main',
        loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'booking',
        loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then((m) => m.FeedbackModule),
      },

      {
        path: 'dashboard',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then((m) => m.AdminDashboardModule),
      },
    ],
  },
];

@NgModule({
  declarations: [PagesComponent],
  imports: [RouterModule.forChild(routes), NgbCollapseModule, NgbDropdownModule],
})
export class PagesModule {}
