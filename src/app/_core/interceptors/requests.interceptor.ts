import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

import {LocalStorageService} from "../../shared/services/localStorage.service";
import { environment } from "../../../environments/environment.development";
import { Token } from "@angular/compiler";

@Injectable()

export class RequestsInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: string = environment.apiUrl + request.url;
        const authToken = localStorage.getItem("token")

        if(authToken) {
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + authToken)
            });
        }

        request = request.clone({ url: requestUrl });

        return next.handle(request);
    }
}

export const interceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem("token")
  
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  
    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
  };
