//modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from "@angular/forms"; //para poder utilizar formularios

//rutas
import { MessagesRoutingModule } from './messages-routing.module';


//componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    //definir modulos internos o externos del proyecto
    imports: [
        CommonModule,
        FormsModule,
        MessagesRoutingModule
    ],
    //exportar componentes para poder usarlos fuera de este modulo
    exports: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    //servicios
    providers: []
})

export class MessagesModule { }


