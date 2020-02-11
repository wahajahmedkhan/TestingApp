import { Component } from '@angular/core';
import { AuthService } from '@services/common/auth.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PagesComponent {
  isNavBarCollapsed = true;

  constructor(public auth: AuthService) {}
}
