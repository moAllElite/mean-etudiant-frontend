import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, TitleCasePipe,  UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    NgForOf,
    UpperCasePipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items:
    {
      name:string,
      route:string,
      icon: string
    }[] =[
    { name:'home', route:'',icon:'bi bi-house'},
    { name:'new student', route:'new-student',icon:'bi bi-person-add'},
    {name:'update student', route:'update-student/:email',icon:'bi bi-pencil-fill'},
  ]


}
