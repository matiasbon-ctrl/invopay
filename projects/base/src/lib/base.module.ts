import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BaseComponent } from './base.component';
import { IpButtonModalComponent } from './components/ip-button-modal/ip-button-modal.component';
import { IpDateInputComponent } from './components/ip-date-input/ip-date-input.component';
import { IpInputComponent } from './components/ip-input/ip-input.component';
import { IpModalMobileComponent } from './components/ip-modal-mobile/ip-modal-mobile.component';
import { IpSelectInputComponent } from './components/ip-select-input/ip-select-input.component';
import { IpTextAreaInputComponent } from './components/ip-text-area-input/ip-text-area-input.component';
import { IpTitleMobileComponent } from './components/ip-title-mobile/ip-title-mobile.component';
import { MaterialModule } from './material/material.module';
import { TestViewComponent } from './views/test-view/test-view.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    BaseComponent,
    IpInputComponent,
    IpDateInputComponent,
    TestViewComponent,
    IpSelectInputComponent,
    IpTextAreaInputComponent,
    IpTitleMobileComponent,
    IpModalMobileComponent,
    IpButtonModalComponent,
  ],
  imports: [ReactiveFormsModule, MaterialModule, TranslateModule, CommonModule],
  exports: [BaseComponent, TranslateModule],
})
export class BaseModule {}
