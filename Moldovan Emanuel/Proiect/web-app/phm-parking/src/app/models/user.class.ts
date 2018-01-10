import { Roles } from "../interfaces/roles.interface";
import { auth } from "firebase/app";

export class User {
    uid: string;
    email: string;
    photoURL: string;
    firstName: string;
    lastName: string;

    roles: Roles;

    constructor (authData) {
        this.uid = authData.uid;
        this.email = authData.email;
        this.photoURL = authData.photoURL;
        this.roles = { normal: true };
    }
}