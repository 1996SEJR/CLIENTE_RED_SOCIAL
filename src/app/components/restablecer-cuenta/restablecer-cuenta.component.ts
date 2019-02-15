import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../modules/user';

@Component({
    selector: 'recuperar-cuenta',
    templateUrl: './restablecer-cuenta.component.html',
    styleUrls: ['../../app.component.css'],
    providers: [UserService] //cargar los servicios 
})

export class RestablecerCuentaComponent implements OnInit {
    
    public title:string;
    public status:string;
    public user: User;
    public id;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'RESTABLECER CUENTA';
        this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
    }

    ngOnInit(){
        console.log('Componente de RestablecerCuenta cargado ...');    
        this.id = window.location.href.split('?'); //obteniendo url actual
        console.log(this.id[1]);    
    }

    onSubmit(form){
 
        if(this.user.email != '' && this.user.email != undefined && this.user.password != '' && this.user.password != undefined){
            this._userService.restablecerCuenta(this.user, this.id[1]).subscribe(
                response => {
                    console.log(response)

                    if(response.user){
                        this.status = 'success';
                        form.resetForm(); // or form.reset();                    
                    }else{

                        if (response.message == 'email is not verified') {
                            this.status = 'token'; //token invalido
                        }else{
                            this.status = 'danger';
                        console.log('err');
                        }

                        
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );
        }
    }
}
  