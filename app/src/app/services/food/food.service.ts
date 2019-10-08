import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseBase, IRandomFoodResonse } from "src/app/models";
import { API as api } from "src/app/configs";

@Injectable({
  providedIn: "root",
})
export class FoodService {
  constructor(private _http: HttpClient) {}

  getRandomFood(): Observable<IRandomFoodResonse> {
    return this._http.get<IRandomFoodResonse>(api.random_food);
  }
}
