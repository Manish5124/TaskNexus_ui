import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { NavBarComponent } from './shared/ui/nav-bar/nav-bar.component';
import { MemberComponent } from './dashboard/member/member.component';
import { ProjectManagerComponent } from './dashboard/project-manager/project-manager.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { SprintListsComponent } from './sprints/sprint-lists/sprint-lists.component';
import { AssignTasksComponent } from './tasks/assign-tasks/assign-tasks.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { DashboredPageComponent } from './dashboard/dashbored-page/dashbored-page.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavBarComponent },
  { path: 'member', component: MemberComponent },
  { path: 'project-manager', component: ProjectManagerComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'dashbored', component: DashboredPageComponent },
  { path: 'create-task', component: CreateTaskComponent },

  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: 'dashboard', component: DashboredPageComponent },
      { path: 'projects', component: AdminComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path: 'sprint-lists',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['PROJECT_MANAGER'] },
    component: SprintListsComponent,
  },
  {
    path: 'task',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['TEAM_MEMBER'] },
    component: TaskListComponent,
  },
  {
    path: 'create-task',
    loadComponent: () =>
      import('./tasks/create-task/create-task.component').then(
        (m) => m.CreateTaskComponent,
      ),
  },
  { path: '**', component: LoginComponent },
];
