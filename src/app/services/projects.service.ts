import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projects } from '../interfaces/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService{


private baseUrl = 'http://localhost:8080/api/projects'; // Adjust base URL as per your backend

constructor(private http: HttpClient) {}

getAllProjects(): Observable<Projects[]> {
  return this.http.get<Projects[]>(this.baseUrl);
}

getProjectById(id: number): Observable<Projects> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.get<Projects>(url);
}

createProject(project: Projects): Observable<Projects> {
  return this.http.post<Projects>(this.baseUrl, project);
}

updateProject(id: number, project: Projects): Observable<Projects> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.put<Projects>(url, project);
}

deleteProject(id: number): Observable<void> {
  const url = `${this.baseUrl}/delete/${id}`;
  return this.http.delete<void>(url);
}
}
