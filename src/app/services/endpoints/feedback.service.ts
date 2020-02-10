import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class FeedbackService {

    constructor(private db: AngularFirestore) {
    }

    getFeedBacks() {
        return new Promise<any>((resolve, reject) => {
            this.db.collection('/feedback').snapshotChanges().pipe(map(items => {
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
