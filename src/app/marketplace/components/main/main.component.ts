import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {
    
    public title:string;

    public constructor(){
        this.title = 'Marketplace';
    }

    ngOnInit(){
        console.log('Componente de main cargado ...');
    }
}
  