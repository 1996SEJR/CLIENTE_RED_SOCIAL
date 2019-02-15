import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modules/user';
import { Follow } from '../../modules/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({ 
    //metadatos (características)
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../app.component.css'],
    providers: [UserService, FollowService] //cargar los servicios 
})

export class ProfileComponent implements OnInit {
    public title:string;//propiedades de la clase
    public user: User;
    public status: string;
    public identity;
    public token;    
    public stats;
    public stats_user_login;
    public url: string;
    public followed = false;
    public following = false;


    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ){
        this.title='PERFIL';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats_user_login = this._userService.getStats(); //estadisticas del usuario logueado
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Componente de profile cargado ...');
        this.loadPage();
        
    }

    loadPage(){
        //obteniendo el id que viene de la url
        this._route.params.subscribe( params => { 
            let id = params['id'];
            this.getUser(id);
            this.getCounters(id);

        });
    }

    getUser(id){
        this._userService.getUser(id).subscribe(
            response => {
                //console.log(response.user)
                if(response.user){
                    this.user = response.user;

                    if(response.following && response.following._id){
                        this.following = true;
                    }else{
                        this.following = false;
                    }

                    if(response.followed && response.followed._id){
                        this.followed = true;
                    }else{
                        this.followed = false;
                    }
                    
                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/perfil', this.identity._id]);
            }
        );
    }

    getCounters(id){
        this._userService.getCounters(id).subscribe(
            response => {
                this.stats = response;
                console.log(this.stats);
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    //seguir a usuarios
    followUser(followed){
        var follow = new Follow('', this.identity._id, followed);

        this._followService.addFollow(this.token, follow).subscribe(
            response => {                
                this.following = true;
                this.getCounter();

                this._route.params.subscribe( params => { 
                    let id = params['id'];
                    this.getCounters(id);        
                });
            },
            error => {
                console.log(<any> error);
            }
        );
    }


    //dejar de seguir usuarios
    unfollowUser(followed){
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                this.following = false;
                this.getCounter();

                this._route.params.subscribe( params => { 
                    let id = params['id'];
                    this.getCounters(id);        
                });
            },
            error => {
                console.log(<any> error);
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

    getCounter(){
        this._userService.getCounters().subscribe(
            response => {
                console.log(response);
                this.stats_user_login = response;
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