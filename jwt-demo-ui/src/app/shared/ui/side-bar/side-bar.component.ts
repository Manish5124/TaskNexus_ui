import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule,RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

   constructor(private router: Router) {}
  
    logout() {
      this.router.navigate(['/login']);
    }
    // message =''
    // constructor(private helloService: HelloService){
    //    helloService.helloAdmin().subscribe((res)=> {
    //       this.message = res.message
    //   })
    // }
    

}
