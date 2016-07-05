import { Component } from '@angular/core';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';                   // Load all features
import {  ROUTER_DIRECTIVES } from '@angular/router';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
 


@Component({
  moduleId: module.id,
  selector: 'app-begin',
  templateUrl: 'app.component.html',  
  directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES],
  providers: [HTTP_PROVIDERS, JSONP_PROVIDERS]
})
export class AppComponent {
  title = 'app works!';
}
