import { InjectionToken } from "@angular/core";

export const API_URL = new InjectionToken<string>("apiUrl");

export const API = {
  random_food: "/random.php"
};
