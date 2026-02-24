import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private baseUrl = environment.apiBaseUrl + '/api/project'

  constructor(private http: HttpClient) { }

  getAllProjects(){
    return this.http.get<any>(`http://localhost:8080/api/project/allprojects`)
  }

  deleteProjectById(id:number){
    return this.http.delete(`http://localhost:8080/api/project/${id}`,  { responseType: 'text' } )
  }

  createProject(data:any){
    return this.http.post('http://localhost:8080/api/project',data,  { responseType: 'text' } )
  }

  getProjectById(id: number) {
  return this.http.get(`http://localhost:8080/api/project/${id}`);
}

getAllMembers(){
  return this.http.get<any>(`http://localhost:8080/api/auth/by-role/TEAM_MEMBER`)
}
getAllProjectManagers(){
  return this.http.get<any>(`http://localhost:8080/api/auth/by-role/PROJECT_MANAGER`)
}
}
