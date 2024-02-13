import {Component, Input} from '@angular/core';
import {Student} from "../../model/student.model";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    RouterLink
  ],
  template:`

    <div class="card">
      <h5 class="card-header">{{student.nom_complet | titlecase}}</h5>
      <div class="card-body">
        <h5 class="card-title">{{student.email}}</h5>
        <p class="card-text">created at:  {{student.createdAt | date : 'dd-MM-yyyy'}}</p>
        <button class="btn btn-primary" (click)="onShowDetails(student._id) "  >Details</button>
      </div>
    </div>
  `,

  styles:[`
    .card{
      min-width: 300px;
      min-height: 210px;
      line-height: 2.5rem;
      margin: 0 0 -17% 0;
      inset: 0;
    }
    .card-body{
      text-align: center;
    }
    .card-text{
      font-weight: bold;
    }
  `]
})
export class StudentCardComponent  {
  @Input() student !: Student;
  constructor(readonly router:Router) {
  }

  onShowDetails(id:string):void{
    this.router.navigateByUrl(`student/${id}`).then();
  }

}
