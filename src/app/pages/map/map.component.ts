import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToastService} from '@shared/toast/toast-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AreasService} from '@services/endpoints/areas.service';
import {BookingsService} from '@services/endpoints/bookings.service';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
    @ViewChild('dangerTpl', {static: false}) danger;
    @ViewChild('content', {static: false}) modal;

    markers = [];
    map: google.maps.Map;

    lat = 24.8547;
    lng = 67.0435;

    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
        center: this.coordinates,
        zoom: 12,
    };

    places: Observable<any>;
    slots = [];
    booking = [];

    bookingTime;

    slotSubscription: Subscription;
    bookSubscription: Subscription;

    constructor(private notification: ToastService,
                private modalService: NgbModal,
                private areaService: AreasService,
                private bookingsService: BookingsService) {
        if (this.bookingsService.thisBookingModel === null) {
            this.bookingTime = new Date();
        } else {
            this.bookingTime = this.bookingsService.thisBookingModel;
        }
    }


    ngOnInit() {
        this.areaService.getParkingAraes().then((res => this.places = res));
    }

    ngOnDestroy() {
        this.markers = [];
        this.slotSubscription.unsubscribe();
        this.bookSubscription.unsubscribe();
    }

    mapInitializer() {
        this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
        this.slots.forEach((item) => {
            this.placeMarker(item);
        });
    }

    ngAfterViewInit() {

        return new Promise<any>((resolve, reject) => {
            resolve({
                area: this.areaService.getParkingSlots(),
                booker: this.bookingsService.getBookings()
            });
        }).then((object) => {
            object.booker.then(booker => {
                this.bookSubscription = booker.subscribe(booking => {
                    this.booking = booking;
                    object.area.then(area => {
                        this.slotSubscription = area.subscribe(slots => {
                            this.slots = slots;
                            this.mapInitializer();
                        });
                    });
                });
            });

        });
    }

    open() {
        this.modalService.open(this.modal);
    }

    placeMarker(location) {
        console.log(location, this.booking);
        const color = location.available ? 'green' : 'red';

        const marker = new google.maps.Marker({
            position: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)},
            map: this.map,
            title: location.name,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png',
            },
        });

        marker.setMap(this.map);

        this.markers.push(
            marker.addListener('click', (e) => {
                this.markerClicked(e);
            }),
        );
    }

    viewArea(area) {
        this.map.setZoom(13);
        setTimeout(() => {
            const point = new google.maps.LatLng(area.location.latitude, area.location.longitude);
            this.map.panTo(point);
            setTimeout(() => {
                this.map.setZoom(16);
            }, 500);
        }, 700);
    }

    checkActive() {
    }

    markerClicked(event) {
        console.log(event.latLng.toJSON());
        event = event.latLng.toJSON();
        const location: any = this.slots.find((x) => {
            if (x.lat === event.lat && x.lng === event.lng) {
                return true;
            }
        });
        if (location.available) {
            this.open();
        } else {
            console.log('danger');
            this.showDanger();
        }
    }

    showDanger() {
        this.notification.show(this.danger, {classname: 'bg-danger text-light', delay: 5000});
    }
}
