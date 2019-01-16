//import { Component, OnInit, DoCheck } from '@angular/core';
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

//export class AppComponent implements OnInit, DoCheck {
export class AppComponent  {
  public title:string;
  public identity;
  public stats;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'UTMACH-SN';
    this.url = GLOBAL.url
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    //console.log(this.identity);
  }

  //ngDoCheck: cada vez que se produce un cambio refrescar variables
  ngDoCheck(){//importar DoCheck
    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();
    //console.log(this.stats);
  }

  logout(){
    localStorage.clear();//vaciar el localStorage
    this.identity = null; //borrar los datos del usuario logueado
    this._router.navigate(['/']);
  }
}
