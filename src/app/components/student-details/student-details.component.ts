import {AsyncPipe, DatePipe, NgIf, TitleCasePipe} from '@angular/common';
import {ActivatedRoute,  RouterLink} from '@angular/router';
import { Student } from '../../model/student.model';
import {Component,  signal} from '@angular/core';
import { EtudiantService } from '../../service/etudiant.service';
import {Observable} from "rxjs";
import {Messages} from "../../model/messages.model";
import {ModalMessageComponent} from "../modal-message/modal-message.component";


@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [TitleCasePipe, NgIf, AsyncPipe, DatePipe, RouterLink, ModalMessageComponent],
  template: `

      <div class="card text-center">
        <div class="card-header">
          Featured
        </div>
          <div class="card-body" *ngIf="student$  | async as item">
            <h5 class="card-title">{{ item.nom_complet | titlecase }}</h5>
            <p class="card-text">{{ item.classe }}</p>
            <p class="card-text">{{ item.email }}</p>
            <p class="card-text">{{ item!.telephone }}</p>

            @if (etudiantService.calculateDiff(item.createdAt) > 0 ; as b ) {
              <p class="card-text">{{etudiantService.calculateDiff(item.createdAt) }}  day(s) ago</p>
            } @else if (etudiantService.calculateDiff(item.createdAt) == 0) {
              <p class="card-text"> Earlier today</p>
            } @else {
              <p class="card-text"> Empty</p>
            }

            <button class="btn btn-outline-danger" (click)="onDelete(item.email)" type="button"
                    data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i class="bi bi-trash2"></i>
              Delete
            </button>
        </div>
        <div class="card-footer text-body-secondary">
        </div>
      </div>


        <app-modal
          [hidden]="showDeleteMessage()"
          [redirect]="redirect()"
          [message]="message()"
          [icons]="icons">
            </app-modal>

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
  showDeleteMessage=signal(true);
  id:string="";
  icons:string='';
  message=signal('');
  redirect=signal('');
  student$!:Observable<Student>;
  delete$!:Observable<Messages>;
  constructor(private route: ActivatedRoute,readonly etudiantService: EtudiantService) {
    this.id =  this.route.snapshot.params['id'];
    this.student$ = this.etudiantService.getStudentById(this.id);

  }

  onDelete(email:string) {
    this.showDeleteMessage.set(false);
    this.etudiantService.deleteStudent(email).subscribe(
      value => {
        this.message.set(value.msg);
        this.icons=value.status_code==400? 'bi bi-exclamation-diamond': ' bi bi-check2-circle';

        this.redirect.set('/students');
      }
    );
  }



}
