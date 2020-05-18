import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Reviews } from './reviews';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getReviews(): Observable<Reviews[]> {
    return this.http.get<Reviews[]>(`${apiUrl}`)
      .pipe(
        tap(reviews => console.log('fetched reviews')),
        catchError(this.handleError('getReviews', []))
      );
  }

  getReviewsById(id: string): Observable<Reviews> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Reviews>(url).pipe(
      tap(_ => console.log(`fetched cases id=${id}`)),
      catchError(this.handleError<Reviews>(`getReviewsById id=${id}`))
    );
  }

  addReviews(reviews: Reviews): Observable<Reviews> {
    return this.http.post<Reviews>(apiUrl, reviews, httpOptions).pipe(
      tap((r: Reviews) => console.log(`added reviews w/ id=${r._id}`)),
      catchError(this.handleError<Reviews>('addReviews'))
    );
  }

  updateReviews(id: string, reviews: Reviews): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, reviews, httpOptions).pipe(
      tap(_ => console.log(`updated reviews id=${id}`)),
      catchError(this.handleError<any>('updateReviews'))
    );
  }

  deleteReviews(id: string): Observable<Reviews> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Reviews>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted reviews id=${id}`)),
      catchError(this.handleError<Reviews>('deleteReviews'))
    );
  }
}
