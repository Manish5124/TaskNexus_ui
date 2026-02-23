import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { UserSummary } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  [x: string]: any;

  private baseUrl = environment.apiBaseUrl + "/api/task";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllProject(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/project`);
  }

  getAllSprint(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/sprint/getAllSprints`);
  }

  getAllUsers(): Observable<UserSummary[]> {
    return this.http.get<UserSummary[]>(`${environment.apiBaseUrl}/api/auth/users`);
  }

  getSprintByProject(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/task/getSprintByProjectId/${projectId}`);
  }



    // ✅ Get All Tasks (No ApiResponse wrapper)
  getAllTask(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllTasks`);
  }

  // ✅ Create Task
  createTask(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createtask`, request);
  }

  // ✅ Get Tasks By User
  getTasksByUserId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasksbyuser/${id}`);
  }

  // ✅ Get Tasks By Sprint
  getTasksBySprintId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasksbysprintid/${id}`);
  }

  // ✅ Update Task
  updateTask(id: number, request: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatetask/${id}`, request);
  }

  // ✅ Delete Task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletetask/${id}`);
  }

  // ✅ Get Completed Tasks Percentage
  getCompletedTasksPercentage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCompletedTasksPercentage/${id}`);
  }

  // ✅ Get Overdue Tasks
  getOverdueTasksByUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getOverdueTasksByUser/${id}`);
  }

  
}