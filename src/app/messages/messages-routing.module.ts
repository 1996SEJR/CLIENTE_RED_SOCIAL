import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//cargar componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

//servicio para validar accedo a las rutas de usuarios logueados
import { UserGuard } from '../services/user.guard';


const messagesRoutes: Routes = [
    {
        path: 'mensajes', component: MainComponent, canActivate:[UserGuard]
        /*
        path: 'mensajes',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'enviar', pathMatch: 'full'},
            { path: 'mensajes', component: MainComponent, canActivate:[UserGuard]},
            { path: 'recibidos', component: ReceivedComponent, canActivate:[UserGuard]},
            { path: 'recibidos/:page', component: ReceivedComponent, canActivate:[UserGuard]},
            { path: 'enviados', component: SendedComponent, canActivate:[UserGuard]},
            { path: 'enviados/:page', component: SendedComponent, canActivate:[UserGuard]}
        ]*/
    } 
];

@NgModule({
    imports: [
        RouterModule.forChild(messagesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

//exportar el módulo de rutas de mensajes
export class MessagesRoutingModule{}