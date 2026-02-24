import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;

  projects: any[] = [];
  filteredSprints: any[] = [];
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['TODO', Validators.required],
      priority: ['MEDIUM', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      projectId: [null, Validators.required],
      sprintId: [{ value: null, disabled: true }, Validators.required],
      userId: [null, Validators.required],
    });

    this.taskService.getAllProject().subscribe((res) => (this.projects = res));
    this.taskService.getAllUsers().subscribe((res) => (this.users = res));

    this.taskForm.get('projectId')?.valueChanges.subscribe((projectId) => {
      if (projectId) {
        this.taskService.getSprintByProject(projectId).subscribe({
          next: (res) => {
            this.filteredSprints = res;
            this.taskForm.get('sprintId')?.enable();
          },
          error: (err) => {
            if (err.status === 404) {
              this.filteredSprints = [];

              this.taskForm.get('sprintId')?.reset();
              this.taskForm.get('sprintId')?.disable();

              this.snackBar.open(
                'This project does not contain any sprint.',
                'Close',
                { duration: 3000 },
              );
            }
          },
        });
      } else {
        this.filteredSprints = [];
        this.taskForm.get('sprintId')?.disable();
      }
    });

    if (this.data) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.data);
      this.taskForm.get('sprintId')?.enable();
    }
  }

  submit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const request = this.taskForm.getRawValue();

    if (this.isEditMode) {
      this.taskService
        .updateTask(this.data.id, request)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.taskService
        .createTask(request)
        .subscribe(() => this.dialogRef.close(true));
    }
  }

  close() {
    this.dialogRef.close();
  }
}
