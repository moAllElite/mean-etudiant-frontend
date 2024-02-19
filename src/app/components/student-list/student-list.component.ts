import {Component} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {AsyncPipe, DatePipe, NgForOf, TitleCasePipe} from "@angular/common";
import {EtudiantService} from "../../service/etudiant.service";
import {StudentCardComponent} from "../student-card/student-card.component";
import {Student} from "../../model/student.model";
import {Observable} from "rxjs";
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    NavbarComponent,
    TitleCasePipe,
    DatePipe,
    StudentCardComponent,
    NgForOf,
    AsyncPipe,
  ],
  template:`
    @if (students$ | async; as students){
      <div [class]="students.length % 2 == 0 ||students.length % 5 == 0 ||  students.length % 3 == 0? 'main overall':'uno overall' " >
          @for (student of students;track  student){

              <app-student-card class="cover"  [student]="student" ></app-student-card>

          }
      </div>
      } @else {
        <div>empty</div>
      }




      `,
  styles:[`
    .overall{
      display: flex;
      column-gap: 1.5rem;
      margin: 1.5rem 15em -5% 15em;
      flex-wrap:wrap;
      row-gap: 0;
    }
    .main{
        align-items: start;
        justify-content:start;
      }
    .uno{
      align-items: center;
      justify-content:center;
    }
    .cover{
        margin:5em 0 0 0;
      }



  `],

})
export class StudentListComponent {
  titles:{name:string}[] =  [{name:'nom complet'},{name: 'email'}, {name:'téléphone'}, {name:'classe'}, {name:'create at'}];

  students$ !:Observable<Student[]>;
  constructor( readonly studentService:EtudiantService ){
    this.students$ = this.studentService.getAllStudent();
  }


}
