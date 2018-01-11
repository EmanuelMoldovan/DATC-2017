import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { OnInit } from "@angular/core";

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
    constructor(private auth: AuthService) {

    }

    ngOnInit(): void {
        
    }
}