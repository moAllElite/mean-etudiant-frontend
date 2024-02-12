import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {DatePipe, NgForOf, TitleCasePipe} from "@angular/common";
import {EtudiantService} from "../../service/etudiant.service";
import {StudentCardComponent} from "../student-card/student-card.component";
import {Student} from "../../student/student.interface";


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
        justify-content: center;
        align-items: center;
        flex-wrap:wrap;
        row-gap: 1.2em;
        column-gap: 7em;
        margin: 1.5rem 2em 5em 2em;
      }
    .cover{
        margin:5em 0 0 0;
      }



  `],

})
export class StudentListComponent implements OnInit{
  titles:{name:string}[] =  [{name:'nom complet'},{name: 'email'}, {name:'téléphone'}, {name:'classe'}, {name:'create at'}];


  students !:Student[];
  constructor( readonly studentService:EtudiantService){}

  ngOnInit(): void {
        this.studentService.getAllStudent().subscribe(
          {
            next: (data:Student[]):void=> {
              this.students = data;
              console.log(data);
            },
            error: (err:any)=>console.log(err)
          }
          );
    }



}
