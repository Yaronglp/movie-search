import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

const OMDB_API_KEY = "__YOUR_API_KEY__"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newURL = `${request.url}&apikey=${OMDB_API_KEY}`

    const updatedRequest = request.clone({
      url: newURL
    })

    return next.handle(updatedRequest);
  }
}
