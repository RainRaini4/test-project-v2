import { Injectable } from '@angular/core';
import {IOrder} from "../models/iorder";
import {LocalService} from "./local.service";

const ORDER_KEY : string = 'order'

@Injectable({
  providedIn: 'root'
})

export class OrdersLocalService {

  constructor(private local : LocalService) { }

  public pushNewOrder(newOrder: IOrder[]) : void {
    const data: string | null = this.local.getData(ORDER_KEY)
    const strNewOrder = JSON.stringify(newOrder)

    if (!data) {
      this.local.saveData(ORDER_KEY, strNewOrder)
      return
    }

    let parsedData = JSON.parse(data)

    this.local.saveData(ORDER_KEY, JSON.stringify([ ...parsedData, ...newOrder]))
  }

  public getOrders() : IOrder[] {
    return JSON.parse(<string>this.local.getData(ORDER_KEY))
  }
}
