import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-member',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent {
memberForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      projectName: ['', Validators.required],
      managerName: ['', Validators.required]
    });

    // ✅ If data exists → Edit Mode
    if (data) {
      this.isEditMode = true;
      this.memberForm.patchValue(data);
    }
  }

  save() {
    if (this.memberForm.valid) {
      this.dialogRef.close(this.memberForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
