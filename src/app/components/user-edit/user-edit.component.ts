import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modules/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['../../app.component.css'],
    providers: [UserService, UploadService] //cargar los servicios 
})

export class UserEditComponent implements OnInit {
    public title:string;
    public status:string;
    public user: User;
    public identity;
    public token;
    public url;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.title = 'MIS DATOS';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        //console.log(this.user);
        console.log('Componente de user-edit cargado ...');
    }

    onSubmit(form){
        console.log(this.user);
        this._userService.updateUser(this.user).subscribe( //actualizar el usuario en la base datos
            
            response => {
                if(!response.user){
                    this.status = 'danger';
                    console.log('por aqui');
                    console.log(response.user);
                }else{
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.user));//actualizar el usuario en el localStorage
                    this.identity = this.user; //actualizar el usuario a nivel de la clase

                    //SUBIR IMAGEN DE USUARIO
                    //el 5to parámetro debe coincidir con una propiedad definida en el metodo uploadImage del controlador de user
                    this._uploadService.makeFileRequest(this.url+'update-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
                                        .then((result: any )=>{//con then se captura la respuesta de los que llegue del servicio
                                            //console.log(result);
                                            this.user.image=result.user.image; //actualzar el valor de la imagen
                                            localStorage.setItem('identity', JSON.stringify(this.user));//actualizar el usuario en el localStorage 
                                        });
                }
            },
            error => {
                var errorMessage = <any> error;
                console.log(<any>error);

                if(errorMessage != null){
                    this.status = 'danger';
                }
            }
        );
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput:any){ //obtener un arreglo de las imagenes seleccionadas
        this.filesToUpload = <Array<File>> fileInput.target.files; 
        //console.log(this.filesToUpload);
    }
}
  