import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getAllProjects(){
    return this.http.get<any>('http://localhost:8080/api/project')
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
}
