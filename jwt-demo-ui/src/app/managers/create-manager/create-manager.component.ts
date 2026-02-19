import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-manager',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,NavBarComponent,ReactiveFormsModule,MatDialogModule,MatButtonModule],
  templateUrl: './create-manager.component.html',
  styleUrls: ['./create-manager.component.css']
})
export class CreateManagerComponent {

 managerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.managerForm = this.fb.group({
      managerName: ['', Validators.required],
      assignedProject: ['', Validators.required],
      createdDate: ['', Validators.required]
    });
  }

  save() {
    if (this.managerForm.valid) {
      this.dialogRef.close(this.managerForm.value); // send data back
    }
  }

  close() {
    this.dialogRef.close();
  }
}
