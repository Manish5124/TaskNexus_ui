import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    MatSelectModule,
  ],
  providers: [DatePipe],
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent {

  sprintForm!: FormGroup;
  projects: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateSprintComponent>,
    private sprintService: SprintsService,
    private projectService: ProjectsService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {

    this.sprintForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      projectId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.loadProjects();

  
    if (this.dialogData) {
      this.isEditMode = true;

      this.sprintForm.patchValue({
        id: this.dialogData.id,
        name: this.dialogData.name,
        projectId: this.dialogData.projectId,
        startDate: this.dialogData.startDate ? new Date(this.dialogData.startDate) : null,
        endDate: this.dialogData.endDate ? new Date(this.dialogData.endDate) : null
      });

      this.sprintForm.get('projectId')?.disable();
    }
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

      const formValue = this.sprintForm.getRawValue();

      const formattedData = {
        ...formValue,
        startDate: this.datePipe.transform(formValue.startDate, 'yyyy-MM-dd'),
        endDate: this.datePipe.transform(formValue.endDate, 'yyyy-MM-dd')
      };

      if (formattedData.id) {
        this.sprintService.updateSprint(formattedData.id, formattedData)
          .subscribe({
            next: () => this.dialogRef.close(true),
            error: (err) => console.error("Update error", err)
          });
      } else {
        this.sprintService.createSprint(formattedData)
          .subscribe({
            next: () => this.dialogRef.close(true),
            error: (err) => console.error("Create error", err)
          });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
