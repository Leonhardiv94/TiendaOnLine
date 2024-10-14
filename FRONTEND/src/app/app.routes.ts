import { Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { SuccessfulRegistrationComponent } from './components/successful-registration/successful-registration.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
 
    {path:"home", component: HomeComponent, title: "Inicio"},
    {path:"login", component: LoginComponent, title: "Inicio sesion"},
    {path:"register", component: RegisterComponent, title: "Registro"},
    {path:"admin", component: AdminComponent, title: "Administracion"},
    //{ path: 'manage-users', component: ManageUsersComponent },
    //{ path: 'manage-products', component: ManageProductsComponent },
    {path: "successful-registration", component: SuccessfulRegistrationComponent, title: "Registro exitoso" },
    {path: '**', redirectTo: '/register' }
]; 
