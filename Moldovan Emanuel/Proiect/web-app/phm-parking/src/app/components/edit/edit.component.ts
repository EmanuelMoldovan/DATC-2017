import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AgmPolygon } from "@agm/core/directives/polygon";
import { MouseEvent, Point } from "@agm/core/services/google-maps-types";
import { ParcariService } from "../../services/parcari.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
    
    title: string = 'My first AGM project';
    lat: number = 45.7472419;
    lng: number = 21.2270123;
    markers: marker[] = [];
    paths = [];
    polygons = [];
    polygon: polygon = new polygon();
    parcari;
    zoom: number = 20;
    ref;

    constructor(private authService: AuthService, private parcariService: ParcariService, private db: AngularFireDatabase) {
        
    }

    ngOnInit(): void {
        this.parcariService.getParcari().valueChanges().subscribe(p => {
            this.polygons = p;
        });

        this.parcari = this.parcariService.getParcari().valueChanges();
        
        //this.ref = this.db.list('/parcari').valueChanges().subscribe(p => console.log(p['key']));
        // this.ref.valueChanges().subscribe(p => console.log(Object.keys(p)));
    }

    save() {
        this.parcariService.delete();
        this.polygons.forEach(p => this.parcariService.addParcare(p));
    }

    mapClicked($event) {
        let marker:marker = {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true,
        };

        this.markers.push(marker);
        this.polygon.markers.push(marker);

        this.paths.push({lat: $event.coords.lat, lng: $event.coords.lng});
        if (this.paths.length == 4) {
            this.paths.push(this.paths[0]);
            
            this.polygon.path = this.paths;
            this.polygons.push(this.polygon);
            this.parcariService.addParcare(this.polygon);
            this.polygon.markers.forEach(m => this.markers.pop());
            this.polygon = new polygon();
            this.paths = [];
        }
      }

      clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
      }
      
      markerDragEnd(lat: number, lng:number, m: marker, $event) {
        console.log('dragEnd', m, $event);
      }
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
    draggable: boolean;
}

export class polygon {
    constructor() {
        this.markers = [];
    }
    path: any[];
    markers: marker[];
}
