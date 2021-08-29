import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly storeService: StoreService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.storeService.getI('jwt')) {
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storeService.getI('jwt')}`,
        },
      });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}
