import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../modules/publication';
import { Like } from '../../modules/like';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { LikeService } from '../../services/like.service';
import { CommentaryService } from '../../services/commentary.service';
import { GLOBAL } from '../../services/global';
import * as $ from 'jquery';
import { Commentary } from '../../modules/commentary';

@Component({ 
    //metadatos (características)
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],
    providers: [UserService, PublicationService, LikeService, CommentaryService] //cargar los servicios 
})

export class TimelineComponent implements OnInit {
    public title:string;//propiedades de la clase
    public identity;
    public token;    
    public stats;
    public url: string;
    public status: string;
    public page;
    public page_comment;
    public total;
    public pages;
    public publications: Publication[];
    public publications_copia: string[];
    public estadisticas_likes;
    public showImage;
    public textCommentary:string[];
    public commentary;
    public listaDeComentarios;
    public publicacionActual;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _likeService: LikeService,
        private _commentaryService: CommentaryService
    ){
        this.title='PUBLICACIONES';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats(); //estadisticas del usuario
        this.commentary = new Commentary('', '', '', '', this.identity._id, '');
        this.url = GLOBAL.url;
        this.page = 1;
        this.page_comment = 1;
    }

    ngOnInit(){
        console.log('Componente de timeline cargado ...');
        this.getPublications(this.page);

        this._likeService.getLinking(this.token).subscribe(
            response => {
                //console.log(response);
                if(response.publication_like){
                    this.estadisticas_likes = response.publication_like;
                }else{
                    this.status = 'error';
                }
                //console.log(this.estadisticas_likes);
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
    getPublications(page, adding=false){
        this._publicationService.getPublications(this.token, page).subscribe(
            response => {
                //console.log(response);
                if(response.publications){
                    this.total = response.total_items;
                    this.pages = response.pages;

                    if(adding==false){ 
                        this.publications = response.publications;
                    }else{ //cuando pulse en el boton ver publicaciones
                        var arrayA = this.publications;
                        var arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);
                        //para poder usar jquery instalar
                        //npm install --save @types/jquery
                        $("html, body").animate({ scrollTop: $('html').prop("scrollHeight")}, 500);
                        /*console.log('array a')
                        console.log(arrayA)
                        console.log('publications')
                        console.log(this.publications)*/
                    }

                    /*for (let index = 0; index < this.publications.length; index++) {
                        console.log(this.publications[index]._id);
                        //this.getComments(this.publications[index]._id, index);
                    }*/

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

    public noMore = false; //esta propiedad se la ocupa en timeline.component.html para mostrar el botón de ver publicaciones
    viewMore(){
        //console.log(this.publications.length)
        this.page += 1;
        if( this.page >= this.pages ){
            this.noMore = true;
        }
        this.getPublications(this.page, true);
    }


    refreshPublications(event = null){
        //this.page = 1;
        //this.noMore = false;
        this.getCounter();
        this.getPublications(this.page);
        //console.log(event);
    }

    showThisImage(id){
        this.showImage = id;
    }

    deletePublication(id){
        this.unlikePublication(id, true);   
    }

    getCounter(){
        this._userService.getCounters().subscribe(
            response => {
                //console.log(response);
                this.stats = response;
                localStorage.setItem('stats', JSON.stringify(response));
                this.status = 'success';
                this._router.navigate(['/timeline']);
            },
            error => {
                console.log(<any>error);
            }
        )
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
                    this.getPublications(this.page);
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

    /* COMENTARIOS */
    commentsPublication(form, publication_id){
        console.log('hey')
        //console.log(indice.target.value)
        //var commentary = new Commentary('', indice.target.value, '', '', this.identity._id, publication_id);
        this.commentary.publication = publication_id;
        console.log(this.commentary)

        this._commentaryService.addCommentary(this.token, this.commentary).subscribe(
            response => {                
                if(!response.commentary){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    form.reset();
                    this.getComments(publication_id);
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

    getComments(id_publicacion){

        //console.log(id_publicacion)

        this._commentaryService.getComments(this.token, id_publicacion).subscribe(
            response => {                
                
                //console.log(response);

                if(!response.commentary){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    //console.log(response.commentary);
                    this.listaDeComentarios = response.commentary;
                    this.publicacionActual = response.commentary[0].publication;
                    //console.log(this.publicacionActual)
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