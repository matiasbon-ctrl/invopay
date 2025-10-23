import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from 'base';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { SalesDetailsComponent } from './sales/sales-details/sales-details.component';
import { RevenuesListComponent } from './revenues/revenues-list/revenues-list.component';
import { RevenueDetailComponent } from './revenues/revenue-detail/revenue-detail.component';
import { HomeComponent } from './invopay/views/home/home.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthPrivateGuard } from './guards/auth-private.guard';
const routes: Routes = [
  // 🔹 Login y módulo invopay
  {
    path: 'invopay',
    loadChildren: () =>
      import('./invopay/invopay.module').then((m) => m.InvopayModule),
  }
  ,
   {
    path: '', 
    canActivate:[AuthPrivateGuard],
    component: HomeComponent,
    children: [
      { path: 'sales-list', component: SalesListComponent ,canActivate: [AuthPrivateGuard] },
      { path: 'sales-detail/:id', component: SalesDetailsComponent ,canActivate: [AuthPrivateGuard]},
      { path: 'revenues-list', component: RevenuesListComponent,canActivate: [AuthPrivateGuard] },
      { path: 'revenue-detail/:id', component: RevenueDetailComponent,canActivate: [AuthPrivateGuard] },
      { path: 'suppliers-list', component: SupplierListComponent,canActivate: [AuthPrivateGuard] },
    ],
  }
  ,
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
