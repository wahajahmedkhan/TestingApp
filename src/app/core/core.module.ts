import {NgModule} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from '@services/common/auth.service';

@NgModule({
    imports: [
        AngularFireAuthModule,
        AngularFirestoreModule
    ],
    providers: [AuthService]
})
export class CoreModule {
}
