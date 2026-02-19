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
    'id',
    'managerName',
    'assignedProject',
    'createdDate',
    'actions'
  ];

  dataSource = new MatTableDataSource<ProjectManager>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {}

  // ✅ Load data from localStorage when component loads
  ngOnInit() {
    const storedData = localStorage.getItem('projectManagers');
    if (storedData) {
      this.dataSource.data = JSON.parse(storedData);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ Get next ID dynamically
  getNextId(): number {
    const data = this.dataSource.data;

    if (data.length === 0) {
      return 1;
    }

    return Math.max(...data.map(m => m.id)) + 1;
  }

  openAddManagerDialog() {
    const dialogRef = this.dialog.open(CreateManagerComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const newManager: ProjectManager = {
          id: this.getNextId(),
          managerName: result.managerName,
          assignedProject: result.assignedProject,
          createdDate: result.createdDate
        };

        const updatedData = [...this.dataSource.data, newManager];

        this.dataSource.data = updatedData;

        // ✅ Save to localStorage
        localStorage.setItem('projectManagers', JSON.stringify(updatedData));
      }
    });
  }

  deleteManager(id: number) {
    const updatedData = this.dataSource.data.filter(m => m.id !== id);

    this.dataSource.data = updatedData;

    // ✅ Update localStorage
    localStorage.setItem('projectManagers', JSON.stringify(updatedData));
  }

  // editManager(manager: ProjectManager) {
  //   console.log('Editing manager:', manager);
  // }
}
export interface ProjectManager {
  id: number;
  managerName: string;
  assignedProject: string;
  createdDate: string;
}

