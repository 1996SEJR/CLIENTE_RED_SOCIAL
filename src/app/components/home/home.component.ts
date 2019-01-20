import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [UserService] //cargar los servicios 
})

export class HomeComponent implements OnInit {
    
    public title:string;
    public identity;

    public constructor(
        private _userService: UserService
    ){
        this.title = 'Bienvenido a UTMACH-SN';
        this.identity = this._userService.getIdentity();
        console.log(this.identity)
    }

    ngOnInit(){
        console.log('Componente de home cargado ...');
    }

}
  