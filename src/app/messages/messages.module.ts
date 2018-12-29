//modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from "@angular/forms"; //para poder utilizar formularios
import { MomentModule } from "angular2-moment"; //para poder saber hace que tiempo se hicieron las publicaciones o se enviaron los mensajes

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
        MessagesRoutingModule,
        MomentModule
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


