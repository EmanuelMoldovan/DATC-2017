import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";
import { User } from "../models/user.class";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { AngularFirestoreDocument, AngularFirestore } from "angularfire2/firestore";
import { AngularFireObject } from "angularfire2/database/interfaces";
import { merge } from "rxjs/observable/merge";

@Injectable()
export class AuthService {

    user: firebase.User = null;
    user$: Observable<User>;

    myUser: User;

    constructor(private http: Http, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public flashMessage: FlashMessagesService, private router: Router, private afs: AngularFirestore) {
        this.afAuth.authState
        .subscribe(user => {
            this.user = user;
            console.log(this.user);
        });

        this.afAuth.authState
        .subscribe(user => {
            this.user$ = this.db.object<User>('users/' + user.uid).valueChanges()
            console.log(this.user);
        });

        //this.user$ = this.db.object<User>('users/' + this.user.uid).valueChanges();
    }

    loginWithFacebook() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider).then((resp) => {
            this.updateUser(resp.user);
            this.flashMessage.show('Logarea a avut loc cu succes!', {
                cssClass: 'alert-success', 
                timeout: 3000});
                this.router.navigate(['']);
        }, 
    (err) => {
        this.flashMessage.show('A apărut o eroare!',{
            cssClass: 'alert-danger',
            timeout: 3000
          });
    });
    }

    loginWithGoogle() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then(r => {
            this.updateUser(r.user);
            this.flashMessage.show('Logarea a avut loc cu succes!', {
                cssClass: 'alert-success', 
                timeout: 3000});
                this.router.navigate(['']);
        }, 
        (err) => {
            this.flashMessage.show('A apărut o eroare!',{
                cssClass: 'alert-danger',
                timeout: 3000
              });
        });
    }

    logout() {
        this.afAuth.auth.signOut().then(r => {
            this.flashMessage.show('Ați fost deconectat cu succes!',{
                cssClass: 'alert-success',
                timeout: 3000
              });
        },
    (err) => {
        this.flashMessage.show('A apărut o eroare!',{
            cssClass: 'alert-danger',
            timeout: 3000
          });
    });
    }

    loginWithEmail(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(r => {
            this.updateUser(r);
        });
    }

    loggedInUser(): string {
        this.afAuth.authState.subscribe(u => {
            if (u !== null)
                return u.uid;

            return null;
        });

        return null;
    }        

    createUser(email: string, password: string, name: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(r => {
            try {
                let u = <firebase.User>r;
                u.updateProfile({displayName: name, photoURL: ''});
            }
            finally {

            }
        });
    }

    updateUser(user) {
        const userRef: AngularFireObject<{}> = this.db.object('users/' + user.uid);
        const data: User = {
            uid: user.uid,
            email: user.email,
            firstName: user.name || "",
            lastName: user.displayName || "",
            photoURL: user.photoURL,
            roles: {
                normal: true
            }            
        }

        if (userRef !== null) {
            return userRef.set(data).catch(e => {
                this.db.list('users/').push(data);
            });
        }
        else
        {
            return this.db.list('users/').push(data);
        }
    }

    canRead(user: User): boolean {
        const allowed = ['normal', 'cooker', 'admin'];
        return this.checkAuthorization(user, allowed);
    }

    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if (!user) return false;

        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }

        return false;
    }

}