import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from 'base';
import { HomeComponent } from './home/home.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { SalesDetailsComponent } from './sales/sales-details/sales-details.component';
import { RevenuesListComponent } from './revenues/revenues-list/revenues-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sales-list',
    component: SalesListComponent
  },
  {
    path: 'sales-detail/:id',
    component: SalesDetailsComponent
  },
  {
    path: 'revenues-list',
    component: RevenuesListComponent
  },
  {
    path: 'library',
    children: [
      {
        path: 'base',
        component: BaseComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
