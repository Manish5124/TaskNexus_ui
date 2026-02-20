
import { Component, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprint-lists',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [DatePipe],
  templateUrl: './sprint-lists.component.html',
  styleUrls: ['./sprint-lists.component.css']
})
export class SprintListsComponent {
  displayedColumns: string[] = [
    'name','createdDate', 'startDate', 'endDate', 'actions'
  ];

  dataSource = new MatTableDataSource<Sprint>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private sprintService: SprintsService,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllSprints();
  }

  getAllSprints() {
    this.sprintService.getAllSprints().subscribe({
      next: (res: any[]) => {
        this.dataSource.data = res.map(s => ({
          ...s,
          createdDate: this.datePipe.transform(s.createdDate, 'yyyy-MM-dd')
        }));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Sprint Response ===>", res);
      },
      error: (err) => {
        console.error("Error fetching sprints:", err);
      }
    });
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
      if (!result) return;

      this.sprintService.createSprint(result).subscribe({
        next: () => {
          console.log('Sprint saved on backend');

          // Refresh table from backend
          this.getAllSprints();

          this.snackbar.open('Sprint Created Successfully!', 'Close', {
            duration: 2000,
            verticalPosition: 'top'
          });
        },
        error: (err) => {
          console.error('Error creating sprint:', err);
          this.snackbar.open('Failed to create sprint', 'Close', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      });
    });
  }

  editSprint(sprint: Sprint) {
    const dialogRef = this.dialog.open(CreateSprintComponent, {
      width: '500px',
      data: sprint
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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

  viewSprint(id: number) {
    console.log("View Sprint");
  }

  assignTask() {
  this.router.navigate(['/assign-tasks']);  // adjust route if needed
}
}


export interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  createdDate?: string;
  // projectName:string
}
