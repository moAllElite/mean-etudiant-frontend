import { routes } from './../../app.routes';
import {Component, Input, OnInit, Output} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {DatePipe, NgForOf, TitleCasePipe} from "@angular/common";
import {EtudiantService} from "../../service/etudiant.service";
import {StudentCardComponent} from "../student-card/student-card.component";
import {Student} from "../../model/student.model";

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    NavbarComponent,
    TitleCasePipe,
    DatePipe,
    StudentCardComponent,
    NgForOf,
  ],
  template:`

        <div class="main">
          <app-student-card class="cover" *ngFor="let student of students" [student]="student" ></app-student-card>
        </div>

      `,
  styles:[`

    .main{
        display: flex;
        align-items: center;
        justify-content:center;
        flex-wrap:wrap;
        row-gap: 0;
        column-gap: 1.5rem;
        margin: 1.5rem 15em -5% 15em;
      }
    .cover{
        margin:5em 0 0 0;
      }



  `],

})
export class StudentListComponent implements OnInit{
  titles:{name:string}[] =  [{name:'nom complet'},{name: 'email'}, {name:'téléphone'}, {name:'classe'}, {name:'create at'}];

  students !:Student[];
  constructor( readonly studentService:EtudiantService ){}


  ngOnInit(): void {
        this.studentService.getAllStudent().subscribe(
          {
            next: (data:Student[]):void=> {
              this.students = data;
            },
            error: (err:any)=>console.log(err)
          }
          );
    }



}
