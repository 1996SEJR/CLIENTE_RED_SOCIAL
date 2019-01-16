import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { User } from '../../modules/user';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService] //cargar servicio
})

export class LoginComponent implements OnInit {
    
    public title:string;//propiedades de la clase
    public user:User;
    public status:string;
    public identity;
    public token;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title='Identificate';
        this.user = new User("", "", "", "", "", "", "ROLE_USER", "");         
    }

    ngOnInit(){
        console.log('Componente de login cargado ...');
    }

    onSubmit(){
        //loguear al usuario y conseguir sus datos
        //alert(this.user);
        
        this._userService.signUp(this.user).subscribe(
            
            response => { //responde funcion de callback
                this.identity = response.user;
                console.log(this.identity);
                
                if(!this.identity || !this.identity._id){//si no existe (si es null) 
                    this.status = 'error';                    
                }else{

                    //PERSISTIR DATOS DEL USUARIO
                    localStorage.setItem('identity', JSON.stringify(this.identity));//guardar una nueva variable en el localStorage

                    //CONSEGUIR EL TOKEN
                    this.getToken();
                }  
            },
            error => { //error funcion de callback
                var errorMessage = <any>error;
                
                if(errorMessage != null){
                    this.status = 'error';
                }
                
            }
        );
    }

    getToken(){
        this._userService.signUp(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                
                if(this.token.length <= 0){//si no existe (si es null) 
                    this.status = 'error';                    
                }else{                    

                    //PERSISTIR TOKEN DEL USUARIO
                    localStorage.setItem('token', this.token);//guardar una nueva variable en el localStorage

                    //CONSEGUIR LAS ESTADÍSTICAS DEL USUARIO (MIS SEGUIDORES Y A QUIENES SIGO)
                    this.getCounter();
                    
                }
                
            },
            error => {
                var errorMessage = <any>error;
                
                if(errorMessage != null){
                    this.status = 'error';
                }
                
            }
        );
    }

    getCounter(){
        this._userService.getCounters().subscribe(
            response => {
                console.log(response);
                localStorage.setItem('stats', JSON.stringify(response));
                this.status = 'success';
                this._router.navigate(['/']);
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}
  