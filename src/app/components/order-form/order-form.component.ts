import {ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {OrdersHttpService} from "../../services/orders-http.service";
import {BehaviorSubject, map, Observable, Subject, Subscription} from "rxjs";
import {NgbCalendar, NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as events from "events";
import {IOrder} from "../../models/iorder";
import {OrdersLocalService} from "../../services/orders-local.service";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFormComponent implements OnInit, OnDestroy {

  public today: NgbDate = this.calendar.getToday()
  public VINs: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  public availableTime: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  public disableVINsSelect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  public selectedVIN: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public selectedDate: BehaviorSubject<NgbDate> = new BehaviorSubject<NgbDate>(this.today)
  public selectedTime: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public disableTimeSelect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  public fullName: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public address: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public phone: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined)


  private selectedDateAsString: string = '';
  private selectedDateAsString$: Subscription = new Subscription()
  private getVINs$: Subscription = new Subscription()
  private getAvailableTime$: Subscription = new Subscription()

  constructor(
    private orderHttpService : OrdersHttpService,
    private calendar: NgbCalendar,
    private orderLocalStorage: OrdersLocalService
  ) { }

  ngOnInit(): void {
    this.getVINs$ = this.orderHttpService.getVINs().subscribe((data) => {
      this.VINs.next(data)
      this.disableVINsSelect.next(false)
    })

    this.selectedDateAsString$ = this.selectedDate.asObservable().pipe(
      map(date => `${date.year}-${date.month}-${date.day}`)
    ).subscribe(data => this.selectedDateAsString = data)

    this.getAvailableTime()
  }

  public onSelectDate(event: NgbDate) {
    this.selectedDate.next(event)
    this.selectedTime.next('')
    this.getAvailableTime()
  }

  public save() {
    const newOrder: IOrder[] = [{
      VIN: this.selectedVIN.value,
      fullName: this.fullName.value,
      phone: this.phone.value,
      address: this.address.value,
      date: this.selectedDateAsString,
      time: this.selectedTime.value
    }]

    this.orderLocalStorage.pushNewOrder(newOrder)
  }

  ngOnDestroy() {
    this.getAvailableTime$.unsubscribe()
    this.getVINs$.unsubscribe()
    this.selectedDateAsString$.unsubscribe()
  }


  private getAvailableTime() {
    this.disableTimeSelect.next(true)
    return this.getAvailableTime$ = this.orderHttpService.getTime(this.selectedDateAsString).subscribe((data) => {
      this.availableTime.next(data)
      this.disableTimeSelect.next(false)
    })
  }

}
