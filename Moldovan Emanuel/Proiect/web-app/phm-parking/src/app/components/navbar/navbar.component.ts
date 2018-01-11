import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from '../../services/auth.service';
import { GlobalVariables } from '../../services/global-variables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private global: GlobalVariables
  ) {
    
   }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    
    this.router.navigate(['/email-login']);
    return false;
  }

}
