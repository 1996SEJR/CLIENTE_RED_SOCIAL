import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { MomentModule } from 'angular2-moment'; //libreria para mostrar hace cuanto tiempo se hizo una publicacion
import { FormsModule } from "@angular/forms";
//import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";


//modulo de mensajes (modulo personalizado)
import { MessagesModule } from './messages/messages.module';
//import { MarketplaceModule } from './marketplace/marketplace.module';

//cargar componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecuperarCuentaComponent } from './components/recuperar-cuenta/recuperar-cuenta.component';
import { RestablecerCuentaComponent } from './components/restablecer-cuenta/restablecer-cuenta.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';
import { ValidarEmailComponent } from './components/validar-email/validar-email.component';

//servicios para validar accedo a las rutas de usuarios logueados
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecuperarCuentaComponent,
    RestablecerCuentaComponent,
    ChangePasswordComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent,
    ValidarEmailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
    MessagesModule,
    //MarketplaceModule
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
