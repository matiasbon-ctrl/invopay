import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'projects/base/src/shared/shared.module';
import { BaseModule } from 'projects/base/src/lib/base.module';
import { ComponentsModule } from 'projects/base/src/lib/components/components.module';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { SalesDetailsComponent } from './sales/sales-details/sales-details.component';
import { TitlePageComponent } from './shared/title-page/title-page.component';
import { RevenuesListComponent } from './revenues/revenues-list/revenues-list.component';
import { RevenueDetailComponent } from './revenues/revenue-detail/revenue-detail.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { InvopayModule } from './invopay/invopay.module';
import { HomeComponent } from './invopay/views/home/home.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HomeComponent,SalesListComponent, SalesDetailsComponent, TitlePageComponent, RevenuesListComponent, RevenueDetailComponent, SupplierListComponent],
  imports: [

    ComponentsModule,
    BaseModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
    }),
    InvopayModule
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
