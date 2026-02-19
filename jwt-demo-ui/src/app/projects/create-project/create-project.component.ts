import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,NavBarComponent,MatButtonModule,MatSnackBarModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

    projectForm!: FormGroup;

  // managers: string[] = ['John Doe', 'Jane Smith', 'Robert Brown'];
  // members: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Emma'];

  constructor(private fb: FormBuilder, private router: Router, private projectservice: ProjectsService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      // createdDate: ['', Validators.required],
      // manager: ['', Validators.required],
      // members: [[], Validators.required],
      description: [[], Validators.required],
      // isActive: [true]

    });

  }
  // }
onSubmit(): void {
  if (this.projectForm.invalid) {
    return;
  }

  const data = {
    name: this.projectForm.get('name')?.value,
    description: this.projectForm.get('description')?.value,
    // createdDate: this.projectForm.get('createdDate')?.value,
    //   status: this.projectForm.get('isActive')?.value
  };

  console.log("Form Data --->", data);

  this.projectservice.createProject(data).subscribe({
    next: (res) => {
      console.log("Project Created +++", res); // res is plain text now

      this.snackbar.open('Project Created Successfully!', 'Close', {
        duration: 2000,
        verticalPosition: 'top'
      });

      this.projectForm.reset({ isActive: true });
      this.router.navigate(['/admin']);
    },
    error: (err) => {
      console.error("Error creating project:", err);
    }
  });

}

      // Save to localStorage (for demo)
      // const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      // existingProjects.push(newProject);
      // localStorage.setItem('projects', JSON.stringify(existingProjects))

  goBack() {
    this.router.navigate(['/admin']);
  }

}
