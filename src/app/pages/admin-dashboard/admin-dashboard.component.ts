import {Component, OnInit} from '@angular/core';
import {UsersService} from '@services/endpoints/users.service';
import {BookingsService} from '@services/endpoints/bookings.service';
import {FeedbackService} from '@services/endpoints/feedback.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {

    active = 1;

    service = {};

    users;

    bookings;

    feedBacks;

    constructor(private UserService: UsersService,
                private bookingService: BookingsService,
                private feedBackService: FeedbackService,) {
    }

    ngOnInit() {
        this.users = this.UserService.getUsers();
        this.bookings = this.bookingService.getBookings().then((res) => console.log('ngOnInit getBookings res: ', res));
        this.feedBacks = this.feedBackService.getFeedBacks();
    }


}
