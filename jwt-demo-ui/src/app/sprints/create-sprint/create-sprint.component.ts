import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SprintsService } from 'src/app/services/sprints.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-create-sprint',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [DatePipe],
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent {

  sprintForm!: FormGroup;
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateSprintComponent>,
    private sprintService: SprintsService,
    private projectService: ProjectsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {

    this.sprintForm = this.fb.group({
      name: ['', Validators.required],
      projectId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (res) => {
        this.projects = res;
      },
      error: (err) => {
        console.error("Error fetching projects", err);
      }
    });
  }

 save() {
  if (this.sprintForm.valid) {
    const formValue = this.sprintForm.value;

    const formattedData = {
      ...formValue,
      startDate: this.datePipe.transform(formValue.startDate, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(formValue.endDate, 'yyyy-MM-dd')
    };

    this.sprintService.createSprint(formattedData).subscribe({
      next: (res) => {
        console.log("Sprint Created:", res); // res will be "Sprints saved successfully"
        this.dialogRef.close(true);  // just notify parent
      },
      error: (err) => {
        console.error("Error creating sprint", err);
      }
    });
  }
}


  close() {
    this.dialogRef.close();
  }
}
