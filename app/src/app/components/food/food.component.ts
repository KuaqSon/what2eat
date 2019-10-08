import { Component, OnInit, OnDestroy } from "@angular/core";
import { FoodService } from "src/app/services/food";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IFood } from "src/app/models";
import { StoreService } from "src/app/services";

@Component({
  selector: "app-food",
  templateUrl: "./food.component.html",
  styleUrls: ["./food.component.scss"]
})
export class FoodComponent implements OnInit, OnDestroy {
  private _subscription$: Subject<void> = new Subject<void>();

  public food: IFood;

  constructor(
    private _foodService: FoodService,
    private _store: StoreService
  ) {}

  ngOnInit() {
    this.loadFood();
  }

  ngOnDestroy(): void {
    this._subscription$.next();
    this._subscription$.complete();
  }

  loadFood() {
    const storedFood = this._store.getDailyFood();

    if (!storedFood) {
      this.getRandomFood();
      return;
    }

    const fetchTime = this._store.getFetchFoodTime();
    const today = new Date().getDate().toString();
    if (!fetchTime || fetchTime !== today) {
      this.getRandomFood();
    } else {
      this.food = storedFood;
    }
  }

  getRandomFood() {
    this._foodService
      .getRandomFood()
      .pipe(takeUntil(this._subscription$))
      .subscribe({
        next: response => {
          if (response) {
            const foodResp = response.meals[0];

            this.food = foodResp;
            this._store.setDailyFood(foodResp);
            this._store.setFetchFoodTime(new Date().getDate().toString());
          }
        }
      });
  }
}
