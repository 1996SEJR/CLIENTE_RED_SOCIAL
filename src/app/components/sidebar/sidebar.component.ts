//este componente no se utilizará el routing
//sino q va a actuar como componente normal
//un web component, componente normal
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../modules/publication';

@Component({ 
    //metadatos (características)
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService, UploadService] //cargar los servicios 
})

export class SidebarComponent implements OnInit {
    public identity;
    public token;
    public stats;
    public url;
    public status;//para mostrar mensajes de error o exito
    public publication: Publication;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService,      
        private _uploadService: UploadService     
    ){
        this.identity = this._userService.getIdentity();//obtener el usuario logueado
        this.token = this._userService.getToken(); 
        this.stats = this._userService.getStats(); //estadisticas del usuario
        //console.log(this.stats);
        this.url = GLOBAL.url;
        this.publication = new Publication("", "", "", "", this.identity._id);

    }

    ngOnInit(
    ){
        console.log('componente sidebar cargado con éxito');
    }

    onSubmit(form){
        //console.log(this.publication);
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if(response.publication){
                    //this.publication = response.publication;

                    if(this.filesToUpload){
                        console.log('hay archivo')
                        //subir imagen
                        //el parametro image debe estar relacionado con el parametro que está en el api de publicaciones
                        this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id, [], this.filesToUpload, this.token, 'image').then((result:any)=>{
                            this.publication.file = result.image;

                            
                        });
                    }

                    this.status = "success";
                    form.resetForm(); // or form.reset();
                    this._router.navigate(['/timeline']);
                    
                }else{
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any> error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    public filesToUpload: Array<File>; //array de ficheros
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    //Output
    //video 113: recargar publicaciones
    @Output() sended = new EventEmitter();
    sendPublication(event){
        //console.log(event);
        this.sended.emit({send: 'true'});//se emite el evento
    }
}