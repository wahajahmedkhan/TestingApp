import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class AreasService {

    constructor(private db: AngularFirestore) {
    }

    getParkingAraes() {
        return new Promise<any>((resolve, reject) => {
            resolve(this.db.collection('/areas').valueChanges());
        });

    }

    getParkingSlots() {
        return new Promise<any>((resolve, reject) => {
            resolve(this.db.collection('/slots').valueChanges());
        });
    }

}


