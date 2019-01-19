import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//cargar componentes
import { MainComponent } from './components/main/main.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { ComprasComponent } from './components/compras/compras.component';
import { VentasComponent } from './components/ventas/ventas.component';

//servicio para validar accedo a las rutas de usuarios logueados
import { UserGuard } from '../services/user.guard';


const marketplaceRoutes: Routes = [
    {
        path: 'marketplace',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'explorar', pathMatch: 'full'},
            { path: 'explorar', component: ExplorarComponent, canActivate:[UserGuard]},
            { path: 'explorar/:page', component: ExplorarComponent, canActivate:[UserGuard]},
            { path: 'ventas', component: VentasComponent, canActivate:[UserGuard]},
            { path: 'compras', component: ComprasComponent, canActivate:[UserGuard]}
        ]
    } 
];

@NgModule({
    imports: [
        RouterModule.forChild(marketplaceRoutes)
    ],
    exports: [
        RouterModule
    ]
})

//exportar el módulo de rutas de mensajes
export class MarketplaceRoutingModule{}