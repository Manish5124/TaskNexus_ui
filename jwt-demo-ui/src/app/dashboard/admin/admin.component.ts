import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectComponent } from 'src/app/projects/view-project/view-project.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateProjectComponent } from 'src/app/projects/update-project/update-project.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { SideBarComponent } from 'src/app/shared/ui/side-bar/side-bar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    NavBarComponent,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    SideBarComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  searchId!: number;
  displayedColumns: string[] = [
    'id',
    'name',
    'createdDate',
    'status',
    // 'manager',
    // 'members',
    'actions',
  ];

  expandedElement: any | null = null;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private projects: ProjectsService,
  ) {}
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projects.getAllProjects().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('list of project =>', res);
      },
      error: (res) => {
        console.log('error Response' + res);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  searchProjectById(): void {
    if (!this.searchId) {
      // If input empty, reload full table
      // this.loadProjects();
      this.getAllProjects();
      return;
    }

    this.projects.getProjectById(this.searchId).subscribe({
      next: (project: any) => {
        this.dataSource.data = [project]; // wrap single project in array
      },
      error: (err) => {
        console.error('Error fetching project:', err);
        this.snackbar.open(
          `Project with ID ${this.searchId} not found`,
          'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
          },
        );
        this.dataSource.data = [];
      },
    });
  }

  deleteProject(row: Project) {

    this.projects.deleteProjectById(row.id).subscribe({
      next: (res) => {
        console.log('Project ID deleted: ' + row.id);
        this.dataSource.data = this.dataSource.data.filter(
          (p) => p.id !== row.id,
        );
        this.snackbar.open('Project Deleted Successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        console.error('Error deleting project:', err);
      },
    });
  }

  viewProject(project: any): void {
    this.dialog.open(ViewProjectComponent, {
      width: '800px',
      data: project,
    });
  }
}

export interface Project {
  id: number;
  projectName: string;
  createdDate: string;
  isActive: boolean;
}
