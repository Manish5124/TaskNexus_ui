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

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'admin', component: AdminComponent },
  { path: 'navbar', component: NavBarComponent },
  { path: 'member', component: MemberComponent },
  { path: 'project-manager', component: ProjectManagerComponent },
  { path: 'create-project', component: CreateProjectComponent },
  // { path: 'sprint-lists', component: SprintListsComponent },
  { path: 'assign-tasks', component: AssignTasksComponent },
  // {path: 'user',
  //   canActivate:[AuthGuard, RoleGuard],
  //   data: {roles: ['USER', 'ADMIN'] },
  //   component: UserComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    component: AdminComponent,
  },
  {
    path: 'sprint-lists',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['PROJECT_MANAGER'] },
    component: SprintListsComponent,
  },
   { path: '**', component: LoginComponent },

  
];
