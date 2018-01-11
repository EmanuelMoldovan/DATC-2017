import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
//import {Observable} from "rxjs/Observable";
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/takeWhile';
import {Observable} from "rxjs";
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

    constructor(private authService: AuthService, private db: AngularFireDatabase, private parcariService: ParcariService) {
        
    }

    ngOnInit(): void {
        this.parcariService.getParcari().valueChanges().subscribe(p => {
            this.polygons = p;
        });

        this.date = this.db.list('raw-data/', r => r.limitToLast(500)).valueChanges().take(1);
        this.date.subscribe(data => this.istoric = data);

        Observable.interval(70)
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
    });
    }


    doWork() {
        this.istoric.forEach(element => {
            this.configuratie = element;
        });
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }

}