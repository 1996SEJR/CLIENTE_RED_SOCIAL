import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//cargar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';
import { ValidarEmailComponent } from './components/validar-email/validar-email.component';

//servicio para validar accedo a las rutas de usuarios logueados
import { UserGuard } from './services/user.guard';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'verify', component: ValidarEmailComponent},
    {path: 'mis-datos', component: UserEditComponent, canActivate:[UserGuard]},    
    {path: 'gente', component: UsersComponent, canActivate:[UserGuard]},        
    {path: 'gente/:page', component: UsersComponent, canActivate:[UserGuard]},    
    {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},    
    {path: 'perfil/:id', component: ProfileComponent, canActivate:[UserGuard]},    
    {path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},    
    {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},    
    {path: '**', component: HomeComponent} //error 404
];

//exportar el módulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
