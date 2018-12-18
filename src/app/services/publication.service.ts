import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Publication } from '../modules/publication';
import { GLOBAL } from './global';

@Injectable()
export class PublicationService{
    public url: string;//url del api

    //_http permite llamar al api y utilizar los métodos que hay se encuentran
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addPublication(token, publication):Observable<any>{
        //convertir el objeto de javascript a un JSON
        let params = JSON.stringify(publication);

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.post(this.url + 'publication', params, {headers: headers});
    }

    getPublications(token, page=1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'publications/'+page, {headers: headers});
    }

    getPublicationsUser(token, user_id, page=1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'publications-user/'+user_id+'/'+page, {headers: headers});
    }

    deletePublicaction(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.delete(this.url + 'publication/'+id, {headers: headers});
    }

}