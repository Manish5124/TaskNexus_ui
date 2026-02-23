import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SideBarComponent } from 'src/app/shared/ui/side-bar/side-bar.component';
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';

@Component({
  selector: 'app-dashbored-page',
  standalone: true,
  imports: [CommonModule, MatCardModule,
MatIconModule,
MatProgressBarModule,
SideBarComponent,
NavBarComponent
],
  templateUrl: './dashbored-page.component.html',
  styleUrls: ['./dashbored-page.component.css']
})
export class DashboredPageComponent {
  summaryCards: SummaryCard[] = [
    { title: 'Active Sprints', value: 5, icon: 'track_changes' },
    { title: 'Total Tasks', value: 124, icon: 'assignment' },
    { title: 'Members', value: 18, icon: 'supervisor_account' },
    { title: 'Projects', value: 7, icon: 'workspaces' }
  ];

  projects: Project[] = [
    { name: 'CRM System', dueDate: '30 Mar 2026', progress: 70 },
    { name: 'HR Portal', dueDate: '15 Apr 2026', progress: 45 },
    { name: 'E-Commerce Platform', dueDate: '10 May 2026', progress: 60 }
  ];

  userTasks: UserTask[] = [
    { name: 'John', tasks: 8, progress: 80 },
    { name: 'Sarah', tasks: 5, progress: 50 },
    { name: 'Michael', tasks: 6, progress: 60 }
  ];
}



interface SummaryCard {
  title: string;
  value: number;
  icon: string;
}

interface Project {
  name: string;
  dueDate: string;
  progress: number;
}

interface UserTask {
  name: string;
  tasks: number;
  progress: number;
}
