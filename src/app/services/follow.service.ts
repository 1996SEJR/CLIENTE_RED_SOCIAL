import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Follow } from '../modules/follow';
import { GLOBAL } from './global';

@Injectable()
export class FollowService{
    public url: string;

    //_http permite llamar al api y utilizar los métodos que hay se encuentran
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addFollow(token, follow):Observable<any> {
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.post(this.url + 'follow', params, {headers: headers});
    }

    deleteFollow(token, id):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.delete(this.url + 'follow/' + id, {headers: headers});
    }

    getFollowing(token, userId = null, page = 1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        //petición ajax
        if(userId != null){
            return this._http.get(this.url + 'following/' + userId + '/' + page, {headers: headers});
        }else{
            return this._http.get(this.url + 'following/', {headers: headers});
        }
    }

    getFollowed(token, userId = null, page = 1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        //petición ajax
        if(userId != null){
            return this._http.get(this.url + 'followed/' + userId + '/' + page, {headers: headers});
        }else{
            return this._http.get(this.url + 'followed/', {headers: headers});
        }
    }

    //obtener mis seguidores
    getMyFollows(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
                                        
        return this._http.get(this.url + 'get-my-follows/true', {headers: headers});
    }

}