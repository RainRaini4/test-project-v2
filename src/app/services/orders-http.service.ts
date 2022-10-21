import { Injectable } from '@angular/core';
import {Observable, retry, timeout} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersHttpService {

  constructor(private http: HttpClient) { }

  public getVINs(): Observable<string[]> {
    return this.http.get<string[]>('/api/Car/').pipe(
      timeout(3000),
      retry(5)
    );
  }

  public getTime(date: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/Time/${date}`).pipe(
      timeout(3000),
      retry(5)
    );
  }
}
