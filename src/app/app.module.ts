import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrdersDashboardComponent } from './components/orders-dashboard/orders-dashboard.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {registerLocaleData} from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import localeRuExtra from "@angular/common/locales/extra/ru";
import {NgxMaskModule} from "ngx-mask";

registerLocaleData(localeRu, "ru", localeRuExtra);

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent,
    OrdersDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: "ru-RU"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
