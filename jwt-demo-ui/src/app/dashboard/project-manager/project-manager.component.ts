import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { SideBarComponent } from 'src/app/shared/ui/side-bar/side-bar.component';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateManagerComponent } from 'src/app/managers/create-manager/create-manager.component';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-manager',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    SideBarComponent,
    MatTableModule,
    NavBarComponent,
    MatDialogModule
  ],
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent  implements OnInit, AfterViewInit {

    displayedColumns: string[] = [
    'username',
    'email',
    'createdDate',
    'status'
  ];

  dataSource = new MatTableDataSource<ProjectManager>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.getAllManagers()

  }
  getAllManagers() {
    this.projectService.getAllProjectManagers().subscribe({
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
export interface ProjectManager {
  username: string;
  email: string;
  isActive: string ;
  createdDate: string;
}

