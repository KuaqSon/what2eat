import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  constructor(
    private _foodService: FoodService
  ) { }

  ngOnInit() {
  }

  getRandomFood() {
    this._foodService.getRandomFood()
      .subscribe({
        next: response => {
          console.log(response);
        }
      })
  }

}
