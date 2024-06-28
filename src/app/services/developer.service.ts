// developer.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Developer } from '../interfaces/developer'; // Adjust path as per your project structure

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiUrl = 'http://localhost:8080/api/person'; // Adjust URL as per your backend API

  constructor(private http: HttpClient) {}

  getDevelopers(): Observable<Developer[]> {
    return this.http.get<Developer[]>(this.apiUrl);
  }

  addDeveloper(developer: Developer): Observable<Developer> {
    return this.http.post<Developer>(this.apiUrl, developer);
  }

  updateDeveloper(id: number, developer: Developer): Observable<Developer> {
    return this.http.put<Developer>(`${this.apiUrl}/${id}`, developer);
  }

  deleteDeveloper(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDeveloper(id: number): Observable<Developer> {
    return this.http.get<Developer>(`${this.apiUrl}/${id}`);
  }
}
