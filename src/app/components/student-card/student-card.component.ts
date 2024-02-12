import {Component, Input} from '@angular/core';
import {Student} from "../../student/student.interface";
import {DatePipe, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe
  ],
  template:`

    <div class="card">
      <h5 class="card-header">{{student.nom_complet | titlecase}}</h5>
      <div class="card-body">
        <h5 class="card-title">{{student.email}}</h5>
        <p class="card-text">created at:  {{student.createdAt | date : 'dd-MM-yyyy'}}</p>
        <a href="#" class="btn btn-primary">Details</a>
      </div>
    </div>
  `,

  styles:[`
    .card{
      min-width: 300px;
      min-height: 210px;
      line-height: 2.5rem;
    }
    .card-body{
      text-align: center;
    }
    .card-text{
      font-weight: bold;
    }
  `]
})
export class StudentCardComponent {
  @Input() student !: Student;
}
