import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private http: HttpClient) { }

  getAllSprints(){
    return this.http.get<any>('http://localhost:8080/api/admin/getAllSprints')
  }
  createSprint(data:any){
    return this.http.post('http://localhost:8080/api/admin/createSprint',data, { responseType: 'text' })
  }
}
