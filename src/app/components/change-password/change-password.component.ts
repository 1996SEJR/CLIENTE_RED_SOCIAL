import { Component, OnInit } from '@angular/core';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
//import { User } from '../../modules/user';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['../../app.component.css'],
    providers: [UserService] //cargar los servicios 
})

export class ChangePasswordComponent implements OnInit {
    
    public title:string;
    public status:string;
    //public user: User;
    //public id;
    public new_password = '';
    public old_password = ''
    public identity;

    public constructor(
        //private _route: ActivatedRoute,
        //private _router: Router,
        private _userService: UserService
    ){
        this.title = 'CAMBIAR CLAVE';
        this.identity = this._userService.getIdentity();
        //this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
    }

    ngOnInit(){
        console.log('Componente de ChangePasswordComponent cargado ...');    
        /*this.id = window.location.href.split('?'); //obteniendo url actual
        console.log(this.id[1]);    */
    }

    onSubmit(form){
        if(this.old_password != '' && this.new_password != ''){
            this._userService.cambiarClave(this.identity._id, this.old_password, this.new_password).subscribe(
                response => {
                    //console.log(response)

                    if(response.user){
                        this.status = 'success';
                        form.resetForm(); // or form.reset();                    
                    }else{
                        this.status = 'danger';
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
  