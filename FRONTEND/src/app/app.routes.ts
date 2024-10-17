import { Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { SuccessfulRegistrationComponent } from './components/successful-registration/successful-registration.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsLoginComponent } from './components/products-login/products-login.component';

export const routes: Routes = [
 
    {path:"home", component: HomeComponent, title: "Inicio"},
    {path:"login", component: LoginComponent, title: "Inicio sesion"},
    {path:"register", component: RegisterComponent, title: "Registro"},
    {path:"admin", component: AdminComponent, title: "Administracion"},
    {path:"products", component: ProductsComponent, title: "Productos"},
    {path:"products-login", component: ProductsLoginComponent, title: "Productos"},
    {path:"manage-products", component: ManageProductsComponent, title: "AdminProducts"},
    {path:"manage-users", component: ManageUsersComponent, title: "AdminUsers"},
    {path:"successful-registration", component: SuccessfulRegistrationComponent, title: "Registro exitoso" },
    {path:"**", redirectTo: "/register" }
]; 
