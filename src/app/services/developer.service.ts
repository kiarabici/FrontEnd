// developer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // API endpoint

  constructor(private http: HttpClient) { }

  getDevelopers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Use apiUrl directly without appending '/developers'
  }
}
