import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../modules/user';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;
    public stats;

    //_http permite llamar al api y utilizar los métodos que hay se encuentran
    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    register(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'register', params, {headers: headers});
    }

    //metodo de login
    signUp(user, gettoken=null): Observable<any>{
        if(gettoken != null){
            console.log('signUp -- gettoken');
           user.gettoken = gettoken;
        }

        let params = JSON.stringify(user); //convertir el objeto a un string
        let headers = new HttpHeaders().set('Content-Type', 'application/json');//definicion de cabeceras
        //return null;
        return this._http.post(this.url+'login', params, {headers: headers});   
    }

    getIdentity(){
        //JSON.parse: convertir string a objeto de javascript
        //localStorage.getItem: conseguir el identity que esté en el localStorage
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){ //si esta logueado correctamente
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        //localStorage.getItem: conseguir el token que esté en el localStorage        
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }

    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats'));
        //console.log(stats);
        
        if(stats != "undefined"){
            this.stats = stats;
        }else{
            this.stats = null;
        }
        return this.stats;
    }

    getCounters(userId = null): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());

        if(userId != null){
            return this._http.get(this.url+'counters/'+userId, {headers: headers});
        }else{
            return this._http.get(this.url+'counters', {headers: headers});            
        }
    }

    updateUser(user:User):Observable<any>{
        let params = JSON.stringify(user);
        console.log('servicios');
        console.log(user);
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());

        return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers});
    }

    //OBTENER TODOS LOS USUARIOS
    getUsers(page=null):Observable<any>{ 
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());

        return this._http.get(this.url+'users/' + page , {headers: headers});
    }

    //OBTENER UN USUARIO
    getUser(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());

        return this._http.get(this.url+'user/' + id , {headers: headers});
    }
}