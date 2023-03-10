import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import {AddNewProductComponent} from './add-new-product/add-new-product.component';
import {ShowProductDetailsComponent} from './show-product-details/show-product-details.component';
import {ProductResolveService} from './_services/product-resolve.service';
import {ProductViewDetailsComponent} from './product-view-details/product-view-details.component';
import {RegisterComponent} from './register/register.component';
import {BuyNowComponent} from './buy-now/buy-now.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: ['Admin']} },
  { path: 'user', redirectTo: '/home', pathMatch: 'full' ,  canActivate: [AuthGuard], data: {roles: ['User']} },
  { path: 'buyNow', component: BuyNowComponent, canActivate: [AuthGuard], data: {roles: ['User']}},
  { path: 'login', component: LoginComponent },
  { path: 'registerNewUser', component: RegisterComponent },
  { path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard], data: {roles: ['Admin']},
  resolve: {
    product: ProductResolveService
  }
  },
  { path: 'productViewDetails', component: ProductViewDetailsComponent, resolve: { product: ProductResolveService} },
  {path: 'showProductDetails', component: ShowProductDetailsComponent, canActivate: [AuthGuard], data: {roles: ['Admin']}},
  { path: '**', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
