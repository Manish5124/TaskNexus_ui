import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {
   editForm: FormGroup;

  managers: string[] = ['John Doe', 'Jane Smith', 'Robert Brown'];
  membersList: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Emma'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

      // Initialize form
    this.editForm = this.fb.group({
      projectName: [{ value: data.projectName, disabled: true }], // readonly
      manager: [data.manager, Validators.required],
      members: [data.members, Validators.required]
    });
  }

  // Save button logic
  save() {
    if (this.editForm.valid) {
      const updatedProject = {
        ...this.data,
        manager: this.editForm.value.manager,
        members: this.editForm.value.members
      };

      this.dialogRef.close(updatedProject); // send updated data back
    }
  }

  close() {
    this.dialogRef.close(); // cancel editing
  }
}