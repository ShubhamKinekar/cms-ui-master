import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderOverlayService } from 'src/app/shared/services/common/loader-overlay.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private readonly loaderOverlayService: LoaderOverlayService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const loaderSubscription: Subscription =
      this.loaderOverlayService.loader$.subscribe();
    return next.handle(req).pipe(
      finalize(() => {
        loaderSubscription.unsubscribe();
      })
    );
  }
}
