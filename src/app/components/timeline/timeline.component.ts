import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../modules/publication';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import * as $ from 'jquery';

@Component({ 
    //metadatos (características)
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService] //cargar los servicios 
})

export class TimelineComponent implements OnInit {
    public title:string;//propiedades de la clase
    public identity;
    public token;    
    public url: string;
    public status: string;
    public page;
    public total;
    public pages;
    public publications: Publication[];
    public showImage;
    //public status:string;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ){
        this.title='Timeline';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
    }

    ngOnInit(){
        console.log('Componente de timeline cargado ...');
        this.getPublications(this.page);
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
        //console.log(this.total)
        this.page += 1;
        if( this.page == this.pages ){
            this.noMore = true;
        }

        this.getPublications(this.page, true);
    }

    refreshPublications(event){
        this.getPublications(1);
        //console.log(event);
    }

    showThisImage(id){
        this.showImage = id;
    }
}