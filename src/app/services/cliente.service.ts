import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/catch';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private APIEndpoint = environment.APIEndpoint;
  //private APIEndpoint = 'http://192.168.1.128:3200/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }

  getClienteRecoveryUser(id: number, pin: number) {
    let url = this.APIEndpoint + 'cliente_recovery/?userId=' + id + '&userPass=' + pin;
    return this.http.get(url).pipe(
      map(respuestaData => {
        console.log('respuestaDataaaa::', respuestaData);
        return respuestaData;
      }),

      catchError(this.handleError)
    );
  }

  postSendVerify(verificacion) {
    let url = this.APIEndpoint+ 'create_code';
    console.log('body::::::: ', verificacion);
    return this.http.post(url, verificacion, this.httpOptions)
      .pipe(map(res => {
        console.log('respuestapostttDataaa::', res);
        return res;
      })
      );
  }

  postValidVerify(verificacion) {
    let url = this.APIEndpoint+ 'valid_code';
    console.log('body valid verif ::::::: ', verificacion);
    return this.http.post(url, verificacion, this.httpOptions)
      .pipe(map(res => {
        console.log('respuestapostttDataaa validverif::', res);
        return res;
      })
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

