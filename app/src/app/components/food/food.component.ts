import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from 'src/app/services/food';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit, OnDestroy {

  private _subscription$: Subject<void> = new Subject<void>();

  constructor(
    private _foodService: FoodService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._subscription$.next();
    this._subscription$.complete();
  }

  getRandomFood() {
    this._foodService.getRandomFood()
      .pipe(takeUntil(this._subscription$))
      .subscribe({
        next: response => {
          console.log(response.meals[0]);
        }
      })
  }

}
