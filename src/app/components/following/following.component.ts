import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modules/user';
import { Follow } from '../../modules/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({ 
    //metadatos (características)
    selector: 'following',
    templateUrl: './following.component.html',
    providers: [UserService, FollowService] //cargar los servicios 
})

export class FollowingComponent implements OnInit {
    public title:string;
    public identity;
    public token;
    public page;
    public next_page;
    public prev_page;
    public total;
    public users:User;
    public pages;
    public status:string;
    public follows;
    public following;
    public url;
    public userPageId;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ){
        this.title = 'Siguiendo';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Componente de siguiendo cargado ...');
        this.actualPage();
    }

    actualPage(){
        this._route.params.subscribe(params => {
            let user_id = params['id'];
            this.userPageId = user_id;
            //el signo + convierte a entero
            let page = +params['page']; //obtener un parámetro de la url            
            this.page = page;

            if(!params['page']){
                page = 1;
                this.page = page;
            }

            if(!page){
                page = 1;
                
            }else{                
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if(this.prev_page <= 0){
                    this.prev_page = 1;
                }
            }
            /*console.log('');
            console.log(page);
            console.log(this.page);
            console.log(this.next_page);
            console.log(this.prev_page);*/
            //devolver listado de usuarios
            this.getFollows(user_id,  page);

        });
    }

    getFollows(user_id, page){
        this._followService.getFollowing(this.token, user_id, page).subscribe(
            response => {
                if(!response.follows){
                    this.status = 'error';
                }else{
                    console.log(response)
                    
                    this.total = response.total;
                    this.following = response.follows;
                    this.pages = response.pages;
                    this.follows = response.users_following;

                    if(page > this.pages){
                        this._router.navigate(['/gente', 1]);
                    }
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

    //propiedad
    public followUserOver;
    mouseEnter(user_id){
        this.followUserOver = user_id;
    }

    mouseLeave(){
        this.followUserOver = 0;
    }

    followUser(followed){
        var follow = new Follow('', this.identity._id, followed);

        this._followService.addFollow(this.token, follow).subscribe(
            response => {                
                if(!response.follow){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    //agregar al arreglode follows el id del usuario que se está acabando de seguir
                    this.follows.push(followed);                   
                    console.log(this.follows);
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

    unfollowUser(followed){
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                var search = this.follows.indexOf(followed);
                //si no encuentra search será -1
                console.log(search);
                if(search != -1){
                    //splice eliminar el elemento encontrado (usuario)
                    this.follows.splice(search, 1);
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
  