import { ProjectsService } from 'src/app/services/projects.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SideBarComponent } from "src/app/shared/ui/side-bar/side-bar.component";
import { NavBarComponent } from 'src/app/shared/ui/nav-bar/nav-bar.component';
import { CreateMemberComponent } from 'src/app/members/create-member/create-member.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    SideBarComponent,
    NavBarComponent,
    MatDialogModule
],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {

  displayedColumns: string[] = [
    'username',
    'email',
    'createdDate',
    'status'
  ];

  dataSource = new MatTableDataSource<Member>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,
    private projectsService:ProjectsService
  ) {}

  ngOnInit() {
    const storedData = localStorage.getItem('members');
    if (storedData) {
      this.dataSource.data = JSON.parse(storedData);
    }
    this.getAllMembers()
  }
  getAllMembers(){
    this.projectsService.getAllMembers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log('list of members =>', res);
      },
      error: (res) => {
        console.log('error Response' + res);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

 


}

export interface Member {
  username: string;
  email: string;
  createdDate: string;
  isActive: boolean;
}

  // {
  //       "username": "projectmanager",
  //       "email": "projectmanager@gmail.com",
  //       "createdDate": "2026-02-17 14:53:57",
  //       "isActive": true
  //   },
