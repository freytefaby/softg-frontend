import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class Interceptors implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next : HttpHandler):Observable<HttpEvent<any>>{
        request = request.clone({
            setHeaders:{
                Authorization : 'Bearer '+localStorage.getItem("token")
            }
        });
        console.log("entrando en interceptors");
        
        return next.handle(request);
    }
}