import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TasksService } from 'src/app/services/tasks.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    NavBarComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: TaskResponse[] = [];
  allTasks: TaskResponse[] = [];

  users: any[] = [];
  sprints: any[] = [];
  projects: any[] = [];

  selectedUserId?: number;
  selectedSprintId?: number;
  selectedProjectId?: number;

  completedPercentage = 0;
  overdueCount = 0;

  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {

    this.tasksService.getAllTask().subscribe(res => {
      this.allTasks = res;
      this.tasks = res;
    });

    this.tasksService.getAllProject().subscribe(res => {
      this.projects = res;
    });

    this.tasksService.getAllSprint().subscribe(res => {
      this.sprints = res;
    });

    this.tasksService.getAllUsers().subscribe(res => {
      this.users = res;
    });
  }

  // ✅ CREATE DIALOG
  createTask(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInitialData();
      }
    });
  }

  // ✅ EDIT DIALOG
  editTask(task: TaskResponse): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '800px',
      data: { ...task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInitialData();
      }
    });
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.loadInitialData();
    });
  }

  applyFilters() {
    this.tasks = this.allTasks.filter(task => {

      const matchUser =
        !this.selectedUserId || task.userId === this.selectedUserId;

      const matchSprint =
        !this.selectedSprintId || task.sprintId === this.selectedSprintId;

      const matchProject =
        !this.selectedProjectId || task.projectId === this.selectedProjectId;

      return matchUser && matchSprint && matchProject;
    });

    if (this.selectedUserId) {
      this.tasksService.getCompletedTasksPercentage(this.selectedUserId)
        .subscribe(res => this.completedPercentage = res.data);

      this.tasksService.getOverdueTasksByUser(this.selectedUserId)
        .subscribe(res => this.overdueCount = res.data.length);
    } else {
      this.completedPercentage = 0;
      this.overdueCount = 0;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'TODO': return 'todo';
      case 'IN_PROGRESS': return 'inprogress';
      case 'DONE': return 'completed';
      case 'BLOCKED': return 'blocked';
      default: return '';
    }
  }

}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  startDate: string;
  isActive: boolean;
  createdDate: string;

  userId: number;
  projectId: number;
  sprintId: number;

  projectName: string;
  sprintName: string;
}
