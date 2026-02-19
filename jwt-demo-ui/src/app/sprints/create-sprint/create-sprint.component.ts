import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-sprint',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent {
  sprintForm: FormGroup;
  isEditMode = false;

  statusOptions = ['Pending', 'In-Progress', 'Completed'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateSprintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sprintForm = this.fb.group({
      name: ['', Validators.required],
      projectName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['In-Progress', Validators.required],
      tasks: ['']
    });

    if (data) {
      this.isEditMode = true;
      this.sprintForm.patchValue(data);

      // Auto update status if endDate is today or past
      const end = new Date(data.endDate);
      const today = new Date();
      if (end <= today) {
        this.sprintForm.patchValue({ status: 'Completed' });
      }
    }
  }

  save() {
    if (this.sprintForm.valid) {
      this.dialogRef.close(this.sprintForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
