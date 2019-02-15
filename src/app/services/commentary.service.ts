import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Commentary } from '../modules/commentary';
import { GLOBAL } from './global';

@Injectable()
export class CommentaryService{
    public url: string;

    //_http permite llamar al api y utilizar los métodos que hay se encuentran
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addCommentary(token, commentary):Observable<any> {
        let params = JSON.stringify(commentary);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.post(this.url + 'commentary', params, {headers: headers});
    }

    deleteFollow(token, id):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.delete(this.url + 'follow/' + id, {headers: headers});
    }

    getComments(token, id_publication):Observable<any>{ 
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);

        return this._http.get(this.url+'commentary/' + id_publication , {headers: headers});
    }
}