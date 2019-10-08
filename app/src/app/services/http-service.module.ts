import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { environment } from "src/environments/environment";
import { API_URL } from 'src/app/configs';
import { HttpInterceptorService } from './http-interceptor';
import { StoreService } from './store/store.service';

@NgModule({
  imports: [HttpClientModule]
})
export class HttpServiceModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpServiceModule,
      providers: [
        { provide: API_URL, useValue: environment.baseUrl },
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
        StoreService,
      ]
    }
  }
}
