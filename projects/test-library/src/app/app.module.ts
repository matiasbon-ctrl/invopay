import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { SalesDetailsComponent } from './sales/sales-details/sales-details.component';
import { TitlePageComponent } from './shared/title-page/title-page.component';
import { RevenuesListComponent } from './revenues/revenues-list/revenues-list.component';
import { RevenueDetailComponent } from './revenues/revenue-detail/revenue-detail.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { InvopayModule } from './invopay/invopay.module';
import { HomeComponent } from './invopay/views/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { FilterModalMobileComponent } from './shared/filter-modal-mobile/filter-modal-mobile.component';
import { NotificationListComponent } from './assurance/notification-list/notification-list.component';
import { NotificationDetailsAssuranceComponent } from './assurance/notification-details-assurance/notification-details-assurance.component';
import { ModalResponseComponent } from './shared/modal-response/modal-response.component';
import { PendingSalesComponent } from './revenues/pending-sales/pending-sales.component';
import { TokenInterceptor } from './invopay/services/token.interceptor';
import { DecryptionInterceptor } from './shared/interceptors/decryption.interceptor';
import { DecryptionService } from './shared/services/decryption.service';
import { SharedModule } from './shared/shared.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HomeComponent,SalesListComponent, SalesDetailsComponent, TitlePageComponent, RevenuesListComponent, RevenueDetailComponent, SupplierListComponent, LayoutComponent, FilterModalMobileComponent, NotificationListComponent, NotificationDetailsAssuranceComponent, ModalResponseComponent, PendingSalesComponent],
  imports: [

    SharedModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
    }),
  ],
  providers: [
    DatePipe,
    DecryptionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DecryptionInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
