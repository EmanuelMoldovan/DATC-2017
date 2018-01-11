import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AgmPolygon } from "@agm/core/directives/polygon";
import { MouseEvent, Point } from "@agm/core/services/google-maps-types";
import { ParcariService } from "../../services/parcari.service";
import { DateParcariService } from "../../services/date-parcari.service";
import { Chart } from "chart.js";
import { GlobalVariables } from "../../services/global-variables.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    title: string = 'My first AGM project';
    lat: number = 45.7472419;
    lng: number = 21.2270123;
    markers: marker[] = [];
    paths = [];
    polygons = [];
    polygon: parcare = new parcare();
    zoom: number = 20;
    dateParcari = [];
    liber: number;
    ocupat: number;

    constructor(private authService: AuthService, private parcariService: ParcariService, private dateParcareService: DateParcariService, private global: GlobalVariables) {

    }

    ngOnInit(): void {
        this.parcariService.getParcari().valueChanges().subscribe(p => {
            this.polygons = p;
        });

        this.dateParcareService.getParcari().valueChanges().subscribe(p => {
            this.dateParcari = p;
            this.update();
        })


    }

    update() {
        let date = this.dateParcari[0];
        this.liber = 0;
        this.ocupat = 0;
        let isLive = false;

        for (let i = 0; i < date.length; i++) {
            if (i <= this.polygons.length - 1) {
                if (date[i] == 0) this.liber++;
                if (date[i] == 1) this.ocupat++;
                this.polygons[i].status = date[i];
            }
            if (date[i] != -1) isLive = true;
        }
        this.global.live = isLive;
        let indisponibil = this.polygons.length - this.ocupat - this.liber;

        setTimeout(() => {
            let chart = new Chart('myChart', {
                type: 'pie',
                data: {
                    //labels: coinHistory,
                    datasets: [{
                        data: [this.liber, this.ocupat, indisponibil],
                        backgroundColor: ['green', 'red', 'yellow'],
                    }],
                    labels: [
                        'Locuri libere',
                        'Locuri ocupate',
                        'Locuri indisponibile'
                    ]
                }
            })
        }, 100);
        // console.log(this.polygons);
    }

    mapClicked($event) {
        let marker: marker = {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true,
        };

        this.markers.push(marker);
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    markerDragEnd(lat: number, lng: number, m: marker, $event) {
        console.log('dragEnd', m, $event);
    }
}

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

export class parcare {
    constructor() {
        this.markers = [];
    }
    path: any[];
    markers: marker[];
    status: number;
}
