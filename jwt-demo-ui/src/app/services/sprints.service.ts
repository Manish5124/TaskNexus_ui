import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private http: HttpClient) { }

  getAllSprints(){
    return this.http.get<any>('http://localhost:8080/api/sprint/getAllSprints')
  }
  createSprint(data:any){
    return this.http.post('http://localhost:8080/api/sprint/createSprint',data, { responseType: 'text' })
  }

  updateSprint(id: number, data: any) {
  return this.http.put(`http://localhost:8080/api/sprint/updateSprintById/${id}`, data);
}

deleteSprintById(id:number){
  return this.http.delete(`http://localhost:8080/api/sprint/deleteSprintById/${id}`, { responseType: 'text' } );
}
getSprintById(id:number){
  return this.http.get(`http://localhost:8080/api/sprint/getSprintById/${id}`);
}
}

// /deleteSprintById/{id}
 