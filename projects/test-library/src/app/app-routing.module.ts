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
const routes: Routes = [
  // 🔹 Login y módulo invopay
  {
    path: 'invopay',
    loadChildren: () =>
      import('./invopay/invopay.module').then((m) => m.InvopayModule),
  },
  {
    path: '', 
    component: HomeComponent,
    children: [
      { path: 'sales-list', component: SalesListComponent },
      { path: 'sales-detail/:id', component: SalesDetailsComponent },
      { path: 'revenues-list', component: RevenuesListComponent },
      { path: 'revenue-detail/:id', component: RevenueDetailComponent },
      { path: 'suppliers-list', component: SupplierListComponent },
      { path: 'library/base', component: BaseComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
