import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    
    public title:string;

    public constructor(){
        this.title = 'Bienvenido a UTMACH-SN';
    }

    ngOnInit(){
        console.log('Componente de home cargado ...');
    }

}
  