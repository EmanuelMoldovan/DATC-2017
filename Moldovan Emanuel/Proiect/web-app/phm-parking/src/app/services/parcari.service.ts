import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class ParcariService {
    private basePath: string = 'parcari/';

    constructor(private db: AngularFireDatabase) {

    }

    public getParcari(): AngularFireList<any> {
        return this.db.list(this.basePath);
    }

    public addParcare(parcare) {
        return this.db.list(this.basePath).push(parcare);
    }
}