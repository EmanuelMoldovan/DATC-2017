import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
//import {Observable} from "rxjs/Observable";
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/takeWhile';
import { Observable } from "rxjs";
import { ParcariService } from "../../services/parcari.service";

@Component({
    templateUrl: './istoric.component.html',
    styleUrls: ['./istoric.component.css']
})

export class IstoricComponent implements OnInit {

    date;
    istoric;
    configuratie;
    index: number = 0;

    lat: number = 45.7472419;
    lng: number = 21.2270123;
    paths = [];
    polygons = [];
    polygon;
    zoom: number = 20;
    dateParcari = [];
    progres: number = 0;
    interval: number = 70;
    timer;

    unsubscribe;
    pauza

    constructor(private authService: AuthService, private db: AngularFireDatabase, private parcariService: ParcariService) {

    }

    ngOnInit(): void {
        this.parcariService.getParcari().valueChanges().subscribe(p => {
            this.polygons = p;
        });

        this.date = this.db.list('raw-data/', r => r.limitToLast(500)).valueChanges().take(1);
        this.date.subscribe(data => this.istoric = data);

        this.timer = this.startTime();

    }

    startTime() {
        this.unsubscribe = false;
        this.pauza = false;
        let time = Observable.interval(this.interval)
            .takeWhile(() => true)
            .subscribe(i => {
                // This will be called every 10 seconds until `stopCondition` flag is set to true
                if (this.istoric) {
                    this.configuratie = this.istoric[this.index++];
                    this.progres = ((this.index + 1) / this.istoric.length) * 100;
                    if (this.index == this.istoric.length - 1) {
                        this.index = 0;
                    }
                }

                if (this.unsubscribe) {
                    time.unsubscribe();
                    if (!this.pauza) {
                        this.startTime();
                    }
                }
            });
    }

    faster() {
        this.pauza = false;
        this.unsubscribe = true;
        this.interval *= 2;

        //this.timer = this.startTime();
    }

    slower() {
        this.pauza = false;
        this.unsubscribe = true;
        this.interval /= 2;

        //this.timer = this.startTime();
    }

    pause() {
        if (this.pauza) {
            this.startTime();
        }
        else {
            this.pauza = true;
            this.unsubscribe = true;
        }
    }


    doWork() {
        this.istoric.forEach(element => {
            this.configuratie = element;
        });
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

}