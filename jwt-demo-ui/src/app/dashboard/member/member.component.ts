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
    'id',
    'name',
    'projectName',
    'managerName',
    'actions'
  ];

  dataSource = new MatTableDataSource<Member>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    const storedData = localStorage.getItem('members');
    if (storedData) {
      this.dataSource.data = JSON.parse(storedData);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getNextId(): number {
    const data = this.dataSource.data;
    if (data.length === 0) return 1;
    return Math.max(...data.map(m => m.id)) + 1;
  }

  openAddMemberDialog() {
    const dialogRef = this.dialog.open(CreateMemberComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newMember: Member = {
          id: this.getNextId(),
          ...result
        };

        const updatedData = [...this.dataSource.data, newMember];
        this.dataSource.data = updatedData;

        localStorage.setItem('members', JSON.stringify(updatedData));
      }
    });
  }

  deleteMember(id: number) {
    const updatedData = this.dataSource.data.filter(m => m.id !== id);
    this.dataSource.data = updatedData;
    localStorage.setItem('members', JSON.stringify(updatedData));
  }

 editMember(member: Member) {

  const dialogRef = this.dialog.open(CreateMemberComponent, {
    width: '500px',
    data: member   // ✅ send existing data
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {

      const updatedData = this.dataSource.data.map(m =>
        m.id === member.id
          ? { ...m, ...result }
          : m
      );

      this.dataSource.data = updatedData;

      // ✅ update localStorage
      localStorage.setItem('members', JSON.stringify(updatedData));
    }
  });
}
}

export interface Member {
  id: number;
  name: string;
  projectName: string;
  managerName: string;
}
