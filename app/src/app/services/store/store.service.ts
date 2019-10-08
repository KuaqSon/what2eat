import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { IFood } from "src/app/models";
import { ɵNullViewportScroller } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  private _tempData$ = new BehaviorSubject<any>(null);
  private _sidebarStatus$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  public get tempData$(): Observable<any> {
    return this._tempData$.asObservable();
  }

  public setTemData(data: any) {
    this._tempData$.next(data);
  }

  public get sidebarStatus$(): Observable<boolean> {
    return this._sidebarStatus$.asObservable();
  }

  public toggleSidebar(): void {
    this._sidebarStatus$.next(!this._sidebarStatus$.value);
  }

  // TODO: replace localStorage by storage interface
  public get token(): string {
    return localStorage["cb_token"];
  }

  public setToken(token: string) {
    if (!token) {
      localStorage.removeItem("cb_token");
    } else {
      localStorage["cb_token"] = token;
    }
  }

  public getDailyFood(): IFood {
    const food = localStorage["daily_food"];

    if (food) {
      return JSON.parse(food) as IFood;
    }

    return null;
  }

  public setDailyFood(food: IFood): void {
    if (!food) {
      localStorage.removeItem("daily_food");
    } else {
      localStorage["daily_food"] = JSON.stringify(food);
    }
  }

  public getFetchFoodTime(): string {
    return localStorage["fetch_food_time"];
  }

  public setFetchFoodTime(time: string) {
    if (!time) {
      localStorage.removeItem("fetch_food_time");
    } else {
      localStorage["fetch_food_time"] = time;
    }
  }
}
