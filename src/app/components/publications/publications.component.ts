import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../modules/publication';
import { Like } from '../../modules/like';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { LikeService } from '../../services/like.service';
import { GLOBAL } from '../../services/global';
import * as $ from 'jquery';

@Component({ 
    //metadatos (características)
    selector: 'publications',
    templateUrl: './publications.component.html',
    styleUrls: ['../timeline/timeline.component.css'],
    providers: [UserService, PublicationService, LikeService] //cargar los servicios 
})

export class PublicationsComponent implements OnInit {
    public title:string;//propiedades de la clase
    public identity;
    public token;    
    public url: string;
    public status: string;
    public page;
    public total;
    public pages;
    public estadisticas_likes;
    public publications: Publication[];
    @Input() user:string; //esta propiedad se llena con un valor de afuera
    //public status:string;
    
    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _likeService: LikeService
    ){
        this.title='Publicaciones';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
    }

    ngOnInit(){ 
        console.log('Componente de publications cargado ...');
        //console.log(this.user)
        this.getPublications(this.user, this.page);

        this._likeService.getLinking(this.token).subscribe(
            response => {
                console.log(response);
                
                if(response.publication_like){
                    this.estadisticas_likes = response.publication_like;

                }else{
                    this.status = 'error';
                }
                console.log(this.estadisticas_likes);
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

    //obtener las publicaciones 
    getPublications(user, page, adding=false){
        this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
            response => {
                //console.log(response);
                if(response.publications){
                    this.total = response.total_items;
                    this.pages = response.pages;

                    if(adding==false){ 
                        this.publications = response.publications;
                        console.log('no add')
                        
                    }else{ //cuando pulse en el boton ver publicaciones
                        console.log('add')

                        var arrayA = this.publications;
                        var arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);
                        //para poder usar jquery instalar
                        //npm install --save @types/jquery
                        $("html, body").animate({ scrollTop: $('html').prop("scrollHeight")}, 500);
                        

                    }

                    //si pagina actual es mayor a la pagina que tengo guardada
                    /*if(page > this.pages){
                        //enviar a la home
                        //porque el usuario estará intentando ir a otro sitio
                        //que no conviene :P
                        this._router.navigate(['/home']);
                    }*/

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

    public noMore = false; //esta propiedad se la ocupa en publications.component.html para mostrar el botón de ver publicaciones
    viewMore(){
        this.page += 1;
        
        if( this.page == this.pages ){
            this.noMore = true;
        }
        
        this.getPublications(this.user, this.page, true);        
    }

    refreshPublications(event = null){
        //this.page = 1;
        this.noMore = false;
        //this.getCounter();
        this.getPublications(this.user, this.page, false);
        //console.log(event);
    }

    likePublication(publication_id){
        
        var like = new Like('', this.identity._id, publication_id);

        this._likeService.addLike(this.token, like).subscribe(
            response => {                
                if(!response.like){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    //agregar al arreglo de follows el id del usuario que se está acabando de seguir
                    this.estadisticas_likes.push(publication_id);                   
                    //console.log(this.estadisticas_likes);
                    //this.getCounter();
                    this.getPublications(this.user, this.page);
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

    unlikePublication(publication, delete_publication=false){
        this._likeService.deleteLike(this.token, publication).subscribe(
            response => {
                var search = this.estadisticas_likes.indexOf(publication);
                //si no encuentra search será -1
                if(search != -1){
                    //splice eliminar el elemento encontrado (usuario)
                    this.estadisticas_likes.splice(search, 1);
                    this.refreshPublications();
                    //this.getCounter();
                }
            
                if(delete_publication){
                    this._publicationService.deletePublication(this.token, publication).subscribe(
                        response =>{
                            //this.getPublications(this.page);
                            this.refreshPublications();
                        },
                        error =>{
                            console.log(<any>error);
                        }
                    )
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
}