import {Injectable} from '@angular/core';
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
            resolve(this.db.collection('/bookings').valueChanges());
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
