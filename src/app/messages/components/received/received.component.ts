import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'received',
    templateUrl: './received.component.html'
})

export class ReceivedComponent implements OnInit {
    
    public title:string;

    public constructor(){
        this.title = 'Mensajes recibidos';
    }

    ngOnInit(){
        console.log('Componente de received cargado ...');
    }
}
  