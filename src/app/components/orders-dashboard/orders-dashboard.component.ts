import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersDashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


}
