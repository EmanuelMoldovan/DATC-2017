import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class DateParcariService {
    private basePath: string = 'parking-data/';

    constructor(private db: AngularFireDatabase) {

    }

    public getParcari(): AngularFireList<any> {
        return this.db.list(this.basePath);
    }
}