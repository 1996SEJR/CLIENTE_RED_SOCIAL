//modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from "@angular/forms"; //para poder utilizar formularios
import { MomentModule } from "angular2-moment"; //para poder saber hace que tiempo se hicieron las publicaciones o se enviaron los mensajes

//rutas
import { MarketplaceRoutingModule } from './marketplace-routing.module';

//componentes
import { MainComponent } from './components/main/main.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { ComprasComponent } from './components/compras/compras.component';
import { VentasComponent } from './components/ventas/ventas.component';

//servicios para validar accedo a las rutas de usuarios logueados
import { UserService } from '../services/user.service';
import { UserGuard } from '../services/user.guard';

@NgModule({
    declarations: [
        MainComponent,
        ExplorarComponent,
        ComprasComponent,
        VentasComponent
    ],
    //definir modulos internos o externos del proyecto
    imports: [
        CommonModule,
        FormsModule,
        MarketplaceRoutingModule,
        MomentModule
    ],
    //exportar componentes para poder usarlos fuera de este modulo
    exports: [
        MainComponent,
        ExplorarComponent,
        ComprasComponent,
        VentasComponent
    ],
    //servicios
    providers: [
        UserService,
        UserGuard
    ]
})

export class MarketplaceModule { }


