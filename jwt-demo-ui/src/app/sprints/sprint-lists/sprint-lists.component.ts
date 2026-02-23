
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
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
],
  providers: [DatePipe],
  templateUrl: './sprint-lists.component.html',
  styleUrls: ['./sprint-lists.component.css']
})
export class SprintListsComponent {
  sprintId!:number
  displayedColumns: string[] = [
    'id','name','startDate', 'endDate', 'actions'
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
      console.log("API Response:", res);

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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


  searchProjectById(): void {
  if (!this.sprintId) {
     this.getAllSprints()
    return;
  }

  this.sprintService.getSprintById(this.sprintId).subscribe({
    next: (sprint: any) => {
      this.dataSource.data = [sprint];
    },
    error: (err) => {
      console.error("Error fetching project:", err);
      this.snackbar.open(`Sprint  with ID ${this.sprintId} not found`, 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.dataSource.data = [];
    }
  });
}
  createSprint() {
    const dialogRef = this.dialog.open(CreateSprintComponent, { width: '500px' });

   dialogRef.afterClosed().subscribe(result => {
  if (result) {
    this.getAllSprints();
    this.snackbar.open('Sprint Created Successfully!', 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
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
      this.getAllSprints();
      this.snackbar.open('Sprint Updated Successfully!', 'Close', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
  });
  }


  deleteSprint(sprint: Sprint) {
     this.sprintService.deleteSprintById(sprint.id).subscribe({
    next: (res) => {
      console.log("Project ID deleted: " + sprint.id);
      this.dataSource.data = this.dataSource.data.filter(s => s.id !== sprint.id);
      this.snackbar.open("Project Deleted Successfully!", 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    },
    error: (err) => {
      console.error("Error deleting project:", err);
    }
  });
}

  viewSprint(id: number) {
    console.log("View Sprint");
  }

  assignTask() {
  this.router.navigate(['/assign-tasks']);
}
}


export interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  createdDate?: string;
}
