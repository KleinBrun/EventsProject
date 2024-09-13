import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, FormData } from './form-and-table.component';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://3.133.99.153:3000/api/logs'; // Asegúrate de usar https
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': 'hbytgxjtwdbucrqjvqoyxbopqjupuykj'
        });
    }

    submitForm(data: FormData): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/log`, data, { headers: this.headers, withCredentials: true })
            .pipe(
                catchError(this.handleError)
            );
    }

    getData(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiUrl, { headers: this.headers, withCredentials: true })
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred', error);
        return throwError(error);
    }
}
