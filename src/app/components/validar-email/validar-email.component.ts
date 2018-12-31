import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { User } from '../../modules/user';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'validar-email',
    templateUrl: './validar-email.component.html',
    providers: [UserService] //cargar servicio
})

export class ValidarEmailComponent implements OnInit {
    
    public title:string;//propiedades de la clase
    public user:User;
    public status:string;
    public identity;
    public token;
    public id;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title='Verificación de la cuenta';
        this.user = new User("", "", "", "", "", "", "ROLE_USER", "");         
    }

    ngOnInit(){
        console.log('Componente de validar-email cargado ...');
        this.id = window.location.href.split('?'); //obteniendo url actual
        console.log(this.id[1]);
        //this.URLactual.split('/');
        this.verificarEmail();
    }

    verificarEmail(){
        //loguear al usuario y conseguir sus datos
        //this.id[1] en esa variable está el código generado aleatoriamente para controlar le verificación de la cuenta
        this._userService.verificationEmail(this.id[1]).subscribe(
            
            response => { //responde funcion de callback
                if(response.user && response.user._id){
                    this.status = 'success';
                }else{
                    this.status = 'danger';
                    console.log(response);
                }
            },
            error => { //error funcion de callback
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'danger';
                }
                
            }
        );
    }

}
  