import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OrdersDashboardComponent} from "./components/orders-dashboard/orders-dashboard.component";
import {OrderFormComponent} from "./components/order-form/order-form.component";

const routes: Routes = [
  { path: 'ordersDashboard', component: OrdersDashboardComponent, title: 'Заявки на доставку'},
  { path: 'orderForm', component: OrderFormComponent, title: 'Заказать доставку'},
  { path: '',   redirectTo: '/ordersDashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
