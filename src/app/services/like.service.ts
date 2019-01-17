import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Like } from '../modules/like';
import { GLOBAL } from './global';

@Injectable()
export class LikeService{
    public url: string;

    //_http permite llamar al api y utilizar los métodos que hay se encuentran
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addLike(token, like):Observable<any> {
        let params = JSON.stringify(like);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.post(this.url + 'saveLike', params, {headers: headers});
    }

    deleteLike(token, id):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.delete(this.url + 'like/' + id, {headers: headers});
    }

    getLinking(token, userId = null, page = 1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        //petición ajax
        if(userId != null){
            return this._http.get(this.url + 'liking/' + userId + '/' + page, {headers: headers});
        }else{
            return this._http.get(this.url + 'liking/', {headers: headers});
        }
    }

}