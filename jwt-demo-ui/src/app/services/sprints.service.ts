import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private http: HttpClient) { }

  getAllSprints(){
    return this.http.get<any>(`${environment.apiBaseUrl}/api/sprint/getAllSprints`)
  }
  createSprint(data:any){
    return this.http.post(`${environment.apiBaseUrl}/api/sprint/createSprint`,data, { responseType: 'text' })
  }

  updateSprint(id: number, data: any) {
  return this.http.put(`${environment.apiBaseUrl}/api/sprint/updateSprintById/${id}`, data);
}

deleteSprintById(id:number){
  return this.http.delete(`${environment.apiBaseUrl}/api/sprint/deleteSprintById/${id}`, { responseType: 'text' } );
}
getSprintById(id:number){
  return this.http.get(`${environment.apiBaseUrl}/api/sprint/getSprintById/${id}`);
}
}

