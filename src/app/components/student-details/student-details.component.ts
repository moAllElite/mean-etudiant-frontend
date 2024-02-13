import {AsyncPipe, DatePipe, NgIf, TitleCasePipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Student } from '../../model/student.model';
import {Component, computed, Input, input, Signal, signal, WritableSignal} from '@angular/core';
import { EtudiantService } from '../../service/etudiant.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [TitleCasePipe, NgIf, AsyncPipe, DatePipe,RouterLink],
  template: `

    <div class="card text-center">
      <div class="card-header">
        Featured
      </div>

      <div class="card-body"  *ngIf="student | async as item">
        <h5 class="card-title">{{item.nom_complet | titlecase}}</h5>
        <p class="card-text">{{item.classe}}</p>
        <p class="card-text">{{item.email}}</p>
        <p  class="card-text">{{item!.telephone}}</p>

        @if (calculateDiff(item.createdAt) <=30 ){
          <p  class="card-text" >{{calculateDiff(item.createdAt)}} day(s) ago</p>
        }@else{
          <p  class="card-text" > Empty</p>
        }
        <button  class="btn btn-primary" routerLink="/students" >
          <i class="bi bi-arrow-left"></i>
          Back for
        </button>
      </div>


      <div class="card-footer text-body-secondary">

      </div>
    </div>
  `,
  styles: [`
    .card{
      display:flex;
      justify-content:center;
      align-content: center;
      flex-wrap: wrap;
      align-items:center;
      margin:10% 0  0 32%;
      width: 500px;
    }
  `],

})
export class StudentDetailsComponent {
  datediff=signal("a");

  id:string="";
  student!:Observable<Student>;
  constructor(private route: ActivatedRoute, readonly etudiantService: EtudiantService) {
    this.id =  this.route.snapshot.params['id'];
    this.student = this.etudiantService.getStudentById(this.id);
  }

  /**
   * calculate difference between created date and date now
   * @param date
   */
  calculateDiff(date: string): number {
    let currentDate: Date = new Date();
    let dateSent: Date = new Date(date);
    return Math.floor(
      (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())
      )
      / (1000 * 60 * 60 * 24));
  }
}
