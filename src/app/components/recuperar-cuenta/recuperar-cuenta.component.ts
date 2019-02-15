import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../modules/user';

@Component({
    selector: 'recuperar-cuenta',
    templateUrl: './recuperar-cuenta.component.html',
    styleUrls: ['../../app.component.css'],
    providers: [UserService] //cargar los servicios 
})

export class RecuperarCuentaComponent implements OnInit {
    
    public title:string;
    public status:string;
    public user: User;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'RECUPERA TU CUENTA';
        this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
    }

    ngOnInit(){
        console.log('Componente de RecuperarCuenta cargado ...');        
    }

    onSubmit(form){

        if(this.user.email != '' && this.user.email != undefined){
            this._userService.sendEmailRecuperarCuenta(this.user).subscribe(
                response => {
                    console.log(response)

                    if(response.ok){
                        this.status = 'success';
                        //form.reset();
                        form.resetForm(); // or form.reset();                    
                    }else{
                        this.status = 'danger';
                        //console.log(response);
                        console.log('err');
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );
        }
        
    }
}
  