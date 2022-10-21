import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {OrdersLocalService} from "../../services/orders-local.service";
import {IOrder} from "../../models/iorder";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersDashboardComponent implements OnInit {

  public tableData: BehaviorSubject<IOrder[]> = new BehaviorSubject<IOrder[]>([])

  constructor(private orderLocalStorage: OrdersLocalService,) {
  }

  ngOnInit(): void {
    this.tableData.next(this.orderLocalStorage.getOrders())
  }
}
