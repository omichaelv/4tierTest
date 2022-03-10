import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Weather } from './shared/weather';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
// Define API
apiURL = 'https://api.openweathermap.org/data/2.5/weather?';
constructor(private http: HttpClient) {}

// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
// HttpClient API get() method => Fetch weather
getWeather(): Observable<Weather> {
  return this.http
    .get<Weather>(this.apiURL + 'q=Parker,CO,US&appid=938f9fa6be423f4bfdb72b6f7251df8f&units=imperial')
    .pipe(retry(1), catchError(this.handleError));
}
// Error handling
handleError(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(() => {
    return errorMessage;
  });
}
}
