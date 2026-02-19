import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';
import { CreateSprintComponent } from '../create-sprint/create-sprint.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SprintsService } from 'src/app/services/sprints.service';

@Component({
  selector: 'app-sprint-lists',
  standalone: true,
  imports: [CommonModule,NavBarComponent,MatIconModule,MatTableModule,MatPaginatorModule,
    MatButtonModule,MatDialogModule,MatCardModule,
  ],
  templateUrl: './sprint-lists.component.html',
  styleUrls: ['./sprint-lists.component.css']
})
export class SprintListsComponent {
   displayedColumns: string[] = [
    'name', 'startDate','createdDate', 'endDate', 'actions'
  ];

  dataSource = new MatTableDataSource<Sprint>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    constructor(private dialog: MatDialog, private sprintService: SprintsService) {}

  ngOnInit() {
    this.getAllSprints()
    const storedData = localStorage.getItem('sprints');
    if (storedData) {
      this.dataSource.data = JSON.parse(storedData);
    }
  }

  getAllSprints(){
    this.sprintService.getAllSprints().subscribe({
      next:(res) =>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        console.log("Sprint Response ===>",res)
      },
      error :(res) =>{
        console.log("error Response"+res)
      }
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getNextId(): number {
    const data = this.dataSource.data;
    if (!data || data.length === 0) return 1;
    return Math.max(...data.map(d => d.id)) + 1;
  }

  createSprint() {
    const dialogRef = this.dialog.open(CreateSprintComponent, { width: '500px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newSprint: Sprint = {
          id: this.getNextId(),
          ...result
        };

        const updatedData = [...this.dataSource.data, newSprint];
        this.dataSource.data = updatedData;
        localStorage.setItem('sprints', JSON.stringify(updatedData));
      }
    });
  }

  editSprint(sprint: Sprint) {
    const dialogRef = this.dialog.open(CreateSprintComponent, {
      width: '500px',
      data: sprint
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Auto update status if end date <= today
        const today = new Date();
        const endDate = new Date(result.endDate);
        if (endDate <= today) {
          result.status = 'Completed';
        }

        const updatedData = this.dataSource.data.map(s =>
          s.id === sprint.id ? { ...s, ...result } : s
        );

        this.dataSource.data = updatedData;
        localStorage.setItem('sprints', JSON.stringify(updatedData));
      }
    });
  }

  deleteSprint(id: number) {
    const updatedData = this.dataSource.data.filter(s => s.id !== id);
    this.dataSource.data = updatedData;
    localStorage.setItem('sprints', JSON.stringify(updatedData));
  }
  viewSprint(id:number){
    console.log("View Sprint")
  }
}
export interface Sprint {
  id: number;
  name: string;
  projectName: string;
  startDate: string;
  endDate: string;
  createdDate:string;
  // status: string;
  // tasks: string;
}

//  {
//         "id": 1,
//         "name": "Sprint 1",
//         "startDate": "2026-02-20",
//         "endDate": "2026-03-05",
//         "tasks": [],
//         "createdDate": "2026-02-17T15:12:43.212822",
//         "updatedDate": "2026-02-17T15:12:43.734764"
//     },
