import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component'; // Importa tu componente
import { HomeOnComponent } from './components/home-on/home-on.component'; // Importa tu componente de login
import { ProductsLoginComponent } from './components/products-login/products-login.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ContactOnComponent } from './components/contact-on/contact-on.component';
import { AuthGuard } from './services/auth.guard'; // Asegúrate de importar el guard

const routes: Routes = [
  { path: 'home-on', component: HomeOnComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'products-login', component: ProductsLoginComponent, canActivate: [AuthGuard] },
  { path: 'manage-products', component: ManageProductsComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'contact-on', component: ContactOnComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
