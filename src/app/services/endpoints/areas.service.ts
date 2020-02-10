import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class AreasService {

    constructor(private db: AngularFirestore) {
    }

    getParkingAraes() {
        return this.db.collection('/areas').snapshotChanges().pipe(map(items => {
            const response = [];
            items.forEach(item => {
                response.push(item.payload.doc.data())
            });
            return response;
        }));

    }

    getParkingSlots() {
        return new Promise<any>((resolve, reject) => {
            this.db.collection('/slots').snapshotChanges().pipe(map(items => {
                const response = [];
                items.forEach(item => {
                    response.push(item.payload.doc.data())
                });
                return response;
            })).subscribe(snapshots => {
                resolve(snapshots)
            })
        })
    }

}


