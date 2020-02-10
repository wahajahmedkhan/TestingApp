import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {BookingModel} from '@model/booking.model';

@Injectable({
    providedIn: 'root',
})
export class BookingsService {
    private bookingModel: BookingModel = null;

    constructor(private db: AngularFirestore) {
    }

    get thisBookingModel() {
        return this.bookingModel;
    }

    setBookingModel(bookingModel: BookingModel) {
        this.bookingModel = bookingModel;
        console.log('BookingService this.bookingModel', this.bookingModel);
    }

    getBookings() {
        return new Promise<any>((resolve, reject) => {
            this.db
                .collection('/bookings')
                .snapshotChanges()
                .pipe(
                    map((items) => {
                        const response = [];
                        items.forEach((item) => {
                            response.push(item.payload.doc.data());
                        });
                        return response;
                    }),
                )
                .subscribe((snapshots) => {
                    resolve(snapshots);
                });
        });
    }

    createBooking(value) {
        return this.db.collection('bookings').add({
            name: value.name,
            nameToSearch: value.name.toLowerCase(),
            surname: value.surname,
            age: parseInt(value.age),
        });
    }

    updateBooking(bookingKey, value) {
        return this.db
            .collection('bookings')
            .doc(bookingKey)
            .set(value);
    }

    deleteUser(bookingKey) {
        return this.db
            .collection('bookings')
            .doc(bookingKey)
            .delete();
    }
}
