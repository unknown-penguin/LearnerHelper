import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Invalid request';
            break;
          case 404:
            errorMessage = error.error?.message || 'Not found';
            break;
          case 409:
            errorMessage = error.error?.message || 'Already exists';
            break;
          case 500:
            errorMessage = error.error?.message || 'Server error';
            break;
          default:
            errorMessage = error.error?.message || error.statusText;
        }
      }

      console.error('HTTP Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
