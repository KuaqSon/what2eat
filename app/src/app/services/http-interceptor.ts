import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { environment } from 'src/environments/environment';
import { API_URL } from '../configs';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreService } from './store/store.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    @Inject(API_URL) private _apiUrl: string,
    private _storeService: StoreService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._storeService.token;
    const url = this.prepareUrl(req.url);

    req = req.clone({
      url: url
    });

    return next.handle(req)
      .pipe(catchError((err) => {

        if (!environment.production) {
          console.log(`%c> call to ${err.url} had an error`, 'background: #f42; font-size: 14px; color: #fff; padding: 8px;', err);
        }

        throw err; // trace it in console

      }));
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this._apiUrl + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
