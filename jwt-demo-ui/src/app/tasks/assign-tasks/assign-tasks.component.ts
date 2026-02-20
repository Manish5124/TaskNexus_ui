import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';

@Component({
  selector: 'app-assign-tasks',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatIconModule,MatButtonModule,NavBarComponent],
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css']
})
export class AssignTasksComponent {
    taskForm!: FormGroup;

  sprintList: any[] = [];
  memberList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSprints();
    this.loadMembers();
  }

  // ✅ Initialize Reactive Form
  initializeForm() {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      sprintId: ['', Validators.required],
      memberId: ['', Validators.required],
      priority: ['', Validators.required],
      createdDate: [this.getTodayDate(), Validators.required],
      endDate: ['', Validators.required]
    });
  }

  // ✅ Default today's date
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Dummy Data (Replace with API)
  loadSprints() {
    this.sprintList = [
      { id: 1, name: 'Sprint 1' },
      { id: 2, name: 'Sprint 2' }
    ];
  }

  loadMembers() {
    this.memberList = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Priya' }
    ];
  }

  // ✅ Submit
  onSubmit() {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const taskData = this.taskForm.value;

    console.log('Task Data:', taskData);

    // 🔹 Call API here
    // this.taskService.createTask(taskData).subscribe(...)

    alert('Task Assigned Successfully!');
    this.router.navigate(['/sprint-list']);
  }
}
