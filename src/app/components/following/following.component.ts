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
    //public users:User;
    public pages;
    public status:string;
    public follows;
    public follows_user_login;
    public following;
    public url;
    public userPageId;
    public stats;
    public user_id;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ){
        this.title = 'Usuarios seguidos por';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.stats = this._userService.getStats(); //estadisticas del usuario logueado
    }

    ngOnInit(){
        console.log('Componente de siguiendo cargado ...');
        this.actualPage();
    }

    actualPage(){
        this._route.params.subscribe(params => {
            this.user_id = params['id'];
            this.userPageId = this.user_id;
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
            //devolver listado de usuarios
            this.getFollows(this.identity._id, page);
            this.getUser(this.user_id, page);
        });
    }
    

    getFollows(user_id, page){
        this._followService.getFollowing(this.token, user_id, page).subscribe(
            response => {
                console.log(response)
                if(!response.follows){
                    this.status = 'error';
                }else{
                    if(user_id == this.identity._id){
                        this.follows_user_login = response.users_following;//response.users_following ids usuarios que estoy siguiendo
                        //this.follows = response.users_following;
                        console.log('son iguales');
                    }else{
                        console.log(response);
                        this.follows = response.users_following; //response.users_followings ids usuarios que estoy siguiendo
                        console.log(this.follows);
                    }
                    

                    this.total = response.total;
                    this.following = response.follows; //response.follows toda la data de los usuarios que estamos siguiendo
                    this.pages = response.pages;
                    
                    /*if(page > this.pages){
                        this._router.navigate(['/gente', 1]);
                    } */
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

    public user:User;
    getUser(user_id, page){
        this._userService.getUser(user_id).subscribe(
            response => {
                if(response.user){
                    this.user = response.user;
                    this.getFollows(user_id, page);
                }else{
                    this._router.navigate(['/home']);
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

                    if(this.user_id == this.identity._id){
                        this.follows_user_login.push(followed);                   
                        console.log(this.follows_user_login);
                    }else{
                        //agregar al arreglode follows el id del usuario que se está acabando de seguir
                        this.follows.push(followed);                   
                        console.log(this.follows);
                        
                    }

                    this.actualPage();
                    this.getCounter();
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

                if(this.user_id == this.identity._id){
                    var search = this.follows_user_login.indexOf(followed);
                    //si no encuentra search será -1
                    console.log(search);
                    if(search != -1){
                        //splice eliminar el elemento encontrado (usuario)
                        this.follows_user_login.splice(search, 1);                    
                        //this.following.splice(search, 1);                    
                    }                    
                }else{
                    var search = this.follows.indexOf(followed);

                    //si no encuentra search será -1
                    console.log(search);
                    if(search != -1){
                        //splice eliminar el elemento encontrado (usuario)
                        this.follows.splice(search, 1);                    
                    }
                    
                }
                this.actualPage();
                this.getCounter();
                
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

    getCounter(){
        this._userService.getCounters().subscribe(
            response => {
                console.log(response);
                this.stats = response;
                localStorage.setItem('stats', JSON.stringify(response));
                /*localStorage.setItem('stats', JSON.stringify(response));
                this.status = 'success';
                this._router.navigate(['/timeline']);*/
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}
  