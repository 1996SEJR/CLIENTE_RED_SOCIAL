import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Message } from '../modules/message';
import { GLOBAL } from './global';

@Injectable()
export class MessageService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addMessage(token, message): Observable<any>{
        let params = JSON.stringify(message);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.post(this.url + 'message', params, {headers: headers});
    }

    //obtener mensajes recibidos
    getMyMessages(token, page = 1): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'my-messages/' + page, {headers: headers});
    }

    //obtener mensajes enviados
    getEmmitMessages(token, page = 1): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'messages/' + page, {headers: headers});
    }

    //obtener mensajes sin leer
    getMessagesNoViewed(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'unviewed-messages', {headers: headers});
    }

    //cambiar el estado del campo viewed de false a true despues de que se ha visto el mensaje
    changeToViewedMessages(token, id_emmiter): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'set-viewed-messages/' + id_emmiter, {headers: headers});
    }

    getAllMessages(token): Observable<any>{ //obtener mensajes enviados y recibidos
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'all_messages', {headers: headers});
    }

    getMessagesOnePeople(token, id_other): Observable<any>{ //obtener mensajes enviados y recibidos
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'with/' + id_other , {headers: headers});
    }
    //getAllMessages
}