import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/catch';
import { catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseURL = 'http://localhost:3200/';
  httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
   // 'Authorization': 'my-auth-token'
 })
};
  constructor(private http: HttpClient) { }

  getClienteRecoveryUser(id: number,pin: number){
    let url = this.baseURL+ 'cliente_recovery/?userId='+id+'&userPass='+pin;
return this.http.get(url).pipe(
map(respuestaData => {
console.log('respuestaDataaaa::', respuestaData);
return respuestaData;
}),

   catchError(this.handleError)
);
}

handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}
}

