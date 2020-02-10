import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbdSortableHeader, SortEvent} from '@shared/sortable.directive';
import {BookingModel} from '@model/booking.model';
import {getDate, getMonth, getYear} from 'date-fns';
import {NgForm} from '@nodeMod/@angular/forms';
import {Router} from '@nodeMod/@angular/router';
import {BookingsService} from '@services/endpoints/bookings.service';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    @ViewChild('bookingForm', {static: false}) bookingForm: NgForm;

    today = this.calendar.getToday();

    model: BookingModel = {
        dateInput: null,
        endTimeInput: null,
        startTimeInput: null,
        date: null,
        endTime: null,
        startTime: null,
    };

    service = {};

    constructor(private calendar: NgbCalendar, private bookingsService: BookingsService, private router: Router) {
    }

    ngOnInit() {
    }

    onSort({column, direction}: SortEvent) {
        // resetting other headers
        this.headers.forEach((header) => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
    }

    onSubmit() {
        const thisDate = new Date();

        const thisYear = getYear(thisDate);
        const thisMonth = getMonth(thisDate);
        const thisDay = getDate(thisDate);

        if (this.model.dateInput !== null && this.model.dateInput.year < thisYear) {
            console.log('this.model.dateInput.year < thisYear');
            this.bookingForm.form.controls.date.setErrors({invalidYear: true});
            return;
        }

        if (this.model.dateInput === null || this.model.startTimeInput === null || this.model.endTimeInput === null) {
            console.log(
                'this.model.dateInput === null || this.model.startTimeInput === null || this.model.endTimeInput === null',
            );
            this.bookingForm.form.markAllAsTouched();
            return;
        }

        if (this.model.dateInput.month - 1 < thisMonth) {
            console.log('this.model.dateInput.month < thisMonth');
            this.bookingForm.form.controls.date.setErrors({invalidYear: true});
            return;
        }

        if (
            this.model.dateInput.year === thisYear &&
            this.model.dateInput.month === thisMonth &&
            this.model.dateInput.day < thisDay
        ) {
            console.log('this.model.dateInput.month === thisMonth && this.model.dateInput.day < thisDay');
            this.bookingForm.form.controls.date.setErrors({invalidYear: true});
            return;
        }

        if (this.model.endTimeInput.hour < this.model.startTimeInput.hour) {
            console.log(
                'this.model.endTimeInput.hour < this.model.startTimeInput.hour\n',
                this.model.endTimeInput.hour,
                '\n',
                this.model.startTimeInput.hour,
            );
            this.bookingForm.form.controls.endTime.setErrors({invalidEndTime: true});
            return;
        }

        if (
            this.model.endTimeInput.hour === this.model.startTimeInput.hour &&
            this.model.endTimeInput.minute < this.model.startTimeInput.minute
        ) {
            console.log('this.model.startTimeInput.minute < this.model.endTimeInput.minute');
            this.bookingForm.form.controls.endTime.setErrors({invalidEndTime: true});
            return;
        }

        this.model.date = new Date(this.model.dateInput.year, this.model.dateInput.month, this.model.dateInput.day);

        this.model.startTime = new Date(
            this.model.dateInput.year,
            this.model.dateInput.month,
            this.model.dateInput.day,
            this.model.startTimeInput.hour,
            this.model.startTimeInput.minute,
        );

        this.model.endTime = new Date(
            this.model.dateInput.year,
            this.model.dateInput.month,
            this.model.dateInput.day,
            this.model.endTimeInput.hour,
            this.model.endTimeInput.minute,
        );

        this.bookingsService.setBookingModel(this.model);

        this.router.navigate(['booking']).then();
    }

    searchSlots() {
        console.log(this.model);
    }
}
