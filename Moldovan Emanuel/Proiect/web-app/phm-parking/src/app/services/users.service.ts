import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { User } from "../models/user.class";

@Injectable()
export class UsersService {
    private basePath: string = 'users/';

    constructor(private db: AngularFireDatabase) {

    }

    public getUseri(): AngularFireList<User> {
        return this.db.list<User>(this.basePath);
    }
}