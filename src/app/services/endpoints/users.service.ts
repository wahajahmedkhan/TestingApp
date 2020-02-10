import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private db: AngularFirestore) {
    }

    getUsers() {
        return new Promise<any>((resolve, reject) => {
            this.db.collection('/users').snapshotChanges().pipe(map(items => {
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
