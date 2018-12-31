import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modules/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService] //cargar los servicios 
})

export class RegisterComponent implements OnInit {
    
    public title:string;
    public status:string;
    public user: User;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Regrístrate';
        this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
    }

    ngOnInit(){
        console.log('Componente de register cargado ...');
    }

    onSubmit(form){
        //console.log(this.user);
        this._userService.register(this.user).subscribe(
            
            response => {
                if(response.user && response.user._id){
                    this.status = 'success';
                    //form.reset();
                    form.resetForm(); // or form.reset();


                    /*this._userService.sendEmailVerification(this.user).subscribe(
                        response => {
                        },
                        error => {
                            console.log(<any>error);
                            console.log('error al enviar correo');
                        }
                    );*/

                    
                }else{
                    this.status = 'danger';
                    console.log(response);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
        
    }
}
  